
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    host: 'postgres',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'pass123'
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL server.');
});

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// Funzione per creare le carte
function create_cards(callback) {
    let queryString = 'SELECT DISTINCT ID, NOME, PREZZO FROM Materie';
    const cards = [];
    pool.query(queryString, (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            cards.push({
                id: row.id,
                nome: row.nome,
                prezzo: row.prezzo,
            });
        });
        callback(null, cards);
    });
}

// Funzione per aggiungere una materia al db
function add_materia(materia) {
    let queryString = 'INSERT INTO MATERIE (NOME, TUTOR_ID, PREZZO) VALUES ($1, $2, $3)';
    const values = [materia.nome, materia.tutor, materia.prezzo];
    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: ", result.rowCount);
    });
}

// Funzione per aggiungere utenti
function add_user(utente) {
    const hashedPassword = hashPassword(utente.password);
    let queryString = 'INSERT INTO UTENTI (NOME, COGNOME, PASSWORD, PRIVILEGI) VALUES ($1, $2, $3, $4)';
    const values = [utente.nome, utente.cognome, hashedPassword, utente.privilegi];
    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: ", result.rowCount);
    });
}

// Funzione per trovare un utente
function find_user(user_to_find, callback) {
    let queryString = 'SELECT * FROM UTENTI JOIN RUOLI ON PRIVILEGI = ID WHERE UTENTI.NOME = $1 AND UTENTI.COGNOME = $2';
    pool.query(queryString, [user_to_find.nome, user_to_find.cognome], (err, result) => {
        if (err) throw err;
        const user = result.rows.map(row => ({
            id: row.ID,
            nome: row.NOME,
            cognome: row.COGNOME,
            ruolo: row.RUOLO_DESC,
        }));
        callback(user);
    });
}

// Funzione per contare i tutor
function count_tutor() {
    let queryString = 'SELECT COUNT(*) FROM TUTOR';
    return new Promise((resolve, reject) => {
        pool.query(queryString, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log("Query executed: ", result.rows[0].count);
                resolve(result.rows[0].count);
            }
        });
    });
}

// Funzione per contare gli utenti
function count_user() {
    let queryString = 'SELECT COUNT(*) FROM UTENTI';
    return new Promise((resolve, reject) => {
        pool.query(queryString, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log("Query executed: ", result.rows[0].count);
                resolve(result.rows[0].count);
            }
        });
    });
}

// Funzione per contare le materie
function count_materie() {
    let queryString = 'SELECT COUNT(*) FROM MATERIE';
    return new Promise((resolve, reject) => {
        pool.query(queryString, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log("Query executed: ", result.rows[0].count);
                resolve(result.rows[0].count);
            }
        });
    });
}

// Funzione per contare gli studenti
function count_student() {
    let queryString = 'SELECT COUNT(*) FROM UTENTI WHERE PRIVILEGI = 2';
    return new Promise((resolve, reject) => {
        pool.query(queryString, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log("Query executed: ", result.rows[0].count);
                resolve(result.rows[0].count);
            }
        });
    });
}

// Funzione per verificare l'autenticazione
function check_auth(user_to_check, callback) {
    let queryString = 'SELECT PASSWORD, PRIVILEGI FROM UTENTI WHERE USERNAME = $1';
    pool.query(queryString, [user_to_check.username], (err, result) => {
        if (err) throw err;
        let user_to_check_hash_pwd = hashPassword(user_to_check.password);
        if (result.rows.length > 0 && result.rows[0].password === user_to_check_hash_pwd) {
            const auth =  result.rows[0].privilegi;
            callback({ authenticated: true, privilegi: auth });
        } else {
            callback({ authenticated: false, privilegi: -1 });
        }
    });
}

// Funzione per user duplicati

function check_multiple_username(username_to_check, callback) {
    let queryString = 'SELECT COUNT(*) FROM UTENTI WHERE USERNAME = $1';
    pool.query(queryString, [username_to_check], (err, result) => {
        if (err) throw err;
        let count = result.rows[0].count;
        callback(count === 1);
    });
}

function check_res(id_tutor, callback) {
    let queryString = 'SELECT FASCE_ORARIE.FASCIA_ORARIA, FASCE_ORARIE.GIORNO FROM LEZIONI JOIN FASCE_ORARIE ON FASCE_ORARIE.ID = LEZIONI.ID_FASCIA WHERE ID_TUTOR = $1';
    pool.query(queryString, [id_tutor], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows)
        }
    })
}

function check_booked(id_tutor, callback) {
    let queryString = 'SELECT FASCE_ORARIE.FASCIA_ORARIA, FASCE_ORARIE.GIORNO FROM LEZIONI JOIN FASCE_ORARIE ON FASCE_ORARIE.ID = LEZIONI.ID_FASCIA WHERE ID_TUTOR = $1 AND ID_DISCENTE IS NOT NULL'
    pool.query(queryString, [id_tutor], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows)
        }
    })
}

function tutor_per_materia(nome_materia, callback) {
    let queryString = 'SELECT TUTOR.RATING, TUTOR.ID_TUTOR, TUTOR.NOME, TUTOR.COGNOME FROM TUTOR JOIN MATERIE ON MATERIE.TUTOR_ID = TUTOR.ID_TUTOR WHERE MATERIE.NOME = $1';
    pool.query(queryString, [nome_materia], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows)
        }
    })
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotte
app.get('/teachers/:nome_materia/tutor', (req, res) => {
    let nome_materia = req.params.nome_materia;
    tutor_per_materia(nome_materia, result => {
        res.json(result);
    })
});


app.get('/tutors/:id_tutor/lezioni', (req, res) => {
    let id_tutor = req.params.id_tutor;
    check_res(id_tutor, lezioni => {
        res.json(lezioni);
    })
});

app.get('/tutors/:id_tutor/prenotate', (req, res) => {
    let id_tutor = req.params.id_tutor;
    check_booked(id_tutor, lezioni => {
        res.json(lezioni);
    })
})

app.get('/cards', (req, res) => {
    create_cards((err, cards) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(cards);
    });
});


app.get('/count_tutor', (req, res) => {
    count_tutor()
        .then(result => {
            console.log("Numero tutor: ", result);
            res.json({ count: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Errore durante la query' });
        });
});

app.get('/count_user', (req, res) => {
    count_user()
        .then(result => {
            console.log("Numero utenti: ", result);
            res.json({ count: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Errore durante la query' });
        });
});

app.get('/count_students', (req, res) => {
    count_student()
        .then(result => {
            console.log("Numero studenti: ", result);
            res.json({ count: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Errore durante la query' });
        });
});

app.get('/count_materie', (req, res) => {
    count_materie()
        .then(result => {
            console.log("Numero materie: ", result);
            res.json({ count: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Errore durante la query' });
        });
});

app.post('/add_materia', (req, res) => {
    let materia = req.body;
    add_materia(materia);
    res.send("Materia added to db");
});

app.post('/add_user', (req, res) => {
    let user = req.body;
    add_user(user);
    res.send("User added to db");
});

app.post('/find_user', (req, res) => {
    let user_to_find = req.body;
    find_user(user_to_find, user => {
        res.json(user);
    });
});

app.get('/verify_auth', (req, res) => {
    let user_to_check = { username: req.query.username, password: req.query.password };
    check_auth(user_to_check, result => {
        res.json(result);
    });
});

app.get('/check_multiple_user', (req, res) => {
    let user_to_check = req.query;
    check_multiple_username(user_to_check, result => {
        console.log("Esito: ", result);
        res.json(result)
    });
})


// Avvio del server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Chiusura del pool di connessioni dopo la chiusura del server
process.on('SIGINT', () => {
    pool.end(() => {
        console.log('Pool di connessioni chiuso.');
        process.exit(0);
    });
});
