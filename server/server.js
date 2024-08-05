const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const req = require('express/lib/request');

const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const pgSession = require('connect-pg-simple')(session);

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
    let queryString = 'SELECT ID_MATERIA, NOME_MATERIA, MIN(tm.prezzo) FROM Materie AS m JOIN Tutor_materie AS tm ON m.ID_MATERIA=tm.FK_MATERIA GROUP BY m.ID_MATERIA, m.NOME_MATERIA';
    const cards = [];
    pool.query(queryString, (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            cards.push({
                id: row.id_materia,
                nome: row.nome_materia,
                prezzo: row.min,
            });
        });
        callback(null, cards);
    });
}

// Funzione per aggiungere una materia al db
function add_materia(materia) {
    let queryString = 'INSERT INTO MATERIE (NOME_MATERIA) VALUES ($1)';
    const values = [materia.nome];
    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: ", result.rowCount);
    });
}

// Funzione per aggiungere utenti

async function add_user(utente) {
    const hashedPassword = hashPassword(utente.password);
    let auth = 0;

    if (utente.selectedType === 'student') {
        auth = 3;
    } else if (utente.selectedType === 'teacher') {
        auth = 2;
    }
    console.log("Auth: ", auth);

    try {
        // inserimento nella tabella utenti
        const queryStringUtenti = 'INSERT INTO UTENTI (USERNAME, PASSWORD, PRIVILEGI) VALUES ($1, $2, $3) RETURNING id_utente';
        const valuesUtenti = [utente.username, hashedPassword, auth];
        const resultUtenti = await pool.query(queryStringUtenti, valuesUtenti);
        const userId = resultUtenti.rows[0].id_utente;

        console.log("Inserted user with ID: ", userId);

        // inserimento nella tabella discente o tutor

        if (auth === 3) {
            const queryStringDiscente = 'INSERT INTO DISCENTE (NOME, COGNOME, MAIL, FK_UTENTE) VALUES ($1, $2, $3, $4)';
            const valuesDiscente = [utente.name, utente.surname, utente.email, userId];
            await pool.query(queryStringDiscente, valuesDiscente);
            console.log("Studente inserted successfully");
        } else if (auth === 2) {
            const queryStringTutor = 'INSERT INTO TUTOR (FK_TUTOR, NOME, COGNOME, MAIL) VALUES ($1, $2, $3, $4)';
            const valuesTutor = [userId, utente.nome, utente.surname, utente.email];
            await pool.query(queryStringTutor, valuesTutor);
            console.log("Tutor inserted successfully");
        }
    } catch (err) {
        console.error("Error inserting user:", err);
        throw err;
    }
}


// Funzione per trovare un utente
function find_user(user_to_find, callback) {
    let queryString = 'SELECT NOME, COGNOME, ID_UTENTE, RUOLO_DESC FROM UTENTI JOIN RUOLI ON PRIVILEGI = ID_RUOLO WHERE UTENTI.NOME = $1 AND UTENTI.COGNOME = $2';
    pool.query(queryString, [user_to_find.nome, user_to_find.cognome], (err, result) => {
        if (err) throw err;
        const user = result.rows.map(row => ({
            id: row.ID_UTENTE,
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
    let queryString = 'SELECT COUNT(*) FROM UTENTI WHERE PRIVILEGI = 3';
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
    let queryString = 'SELECT USERNAME, PASSWORD, PRIVILEGI FROM UTENTI WHERE USERNAME = $1';
    pool.query(queryString, [user_to_check.username], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            callback({ authenticated: false });
            return;
        }
        console.log("Query result:", result.rows[0]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = hashPassword(user_to_check.password);
            if (user.password === hashedPassword) {
                callback({ authenticated: true, privilegi: user.privilegi });
            } else {
                callback({ authenticated: false });
            }
        } else {
            callback({ authenticated: false });
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
    let queryString = 'SELECT FASCE_ORARIE.FASCIA_ORARIA as "fascia", FASCE_ORARIE.GIORNO FROM LEZIONI JOIN FASCE_ORARIE ON ID_FASCIA_ORARIA = FK_FASCIA_ORARIA WHERE FK_TUTOR = $1';
    const res = [];
    pool.query(queryString, [id_tutor], (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            res.push({
                fascia: row.fascia,
                giorno: row.giorno,
            })
        })
    })
}

function check_booked(id_tutor, callback) {
    let queryString = 'SELECT FASCIA_ORARIA as "fascia", GIORNO FROM LEZIONI JOIN FASCE_ORARIE ON ID_FASCIA_ORARIA = FK_FASCIA_ORARIA WHERE FK_TUTOR = $1 AND FK_DISCENTE IS NOT NULL'
    const fasce_orarie = [];
    pool.query(queryString, [id_tutor], (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            fasce_orarie.push({
                fascia: row.fascia,
                giorno: row.giorno,
            });
        });
        callback(null, fasce_orarie);
    })
}

function tutor_per_materia(nome_materia, callback) {
    let queryString = 'SELECT TUTOR.ID_TUTOR, TUTOR.NOME, TUTOR.COGNOME FROM TUTOR JOIN TUTOR_MATERIE ON TUTOR.ID_TUTOR=TUTOR_MATERIE.FK_TUTOR JOIN MATERIE ON TUTOR_MATERIE.FK_MATERIA=MATERIE.ID_MATERIA WHERE NOME_MATERIA=$1';
    const tutor = [];
    pool.query(queryString, [nome_materia], (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            tutor.push({
                id: row.id_tutor,
                nome: row.nome,
                cognome: row.cognome,
            });
        });
        callback(null, tutor);
    })
}

function info_tutor(id_tutor, nome_materia, callback) {
    let queryString = 'SELECT NOME, COGNOME, NOME_LINGUA, LIVELLO_ISTRUZIONE AS "livello", PREZZO FROM TUTOR AS T JOIN COMPETENZE_LINGUISTICHE AS CL ON T.ID_TUTOR=CL.FK_TUTOR JOIN LINGUE AS L ON CL.FK_LINGUA=L.ID_LINGUA JOIN COMPETENZE_ISTR AS CI ON T.ID_TUTOR=CI.FK_TUTOR JOIN ISTRUZIONE AS I ON I.ID_ISTRUZIONE=CI.FK_ISTRUZIONE JOIN TUTOR_MATERIE AS TM ON T.ID_TUTOR=TM.FK_TUTOR JOIN MATERIE AS M ON TM.FK_MATERIA=M.ID_MATERIA WHERE T.ID_TUTOR=$1 AND M.NOME_MATERIA=$2';
    const info = [];
    pool.query(queryString, [id_tutor, nome_materia], (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            info.push({
                nome: row.nome,
                cognome: row.cognome,
                prezzo: row.prezzo,
                //rating: row.rating,
                lingua: row.nome_lingua,
                livello: row.livello,
            })
        });
        callback(null, info)
    })
}

// Middleware

app.use(cookieParser());
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: 'secret',
    resave: false,
    saveUnitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    }
}));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:8080",
    method: ["POST", "GET"],
    credentials: true,
}));

// Rotte

// rotta per la gestione della sessione
app.get('/check_login_session', (req, res) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    if (req.session.authenticated) {
        console.log('Session authenticated:', req.session.authenticated);
        console.log('Session username:', req.session.username);
        return res.json({ valid: true, username: req.session.username });
    } else {
        console.log('Session not authenticated or username not set');
        return res.json({ valid: false });
    }
});

app.get('/teachers/:subject/:id', (req, res) => {
    let nome_materia = req.params.subject;
    let id_tutor = req.params.id;

    info_tutor(id_tutor, nome_materia,(err, result) => {
        res.json(result);
    })
});

app.get('/teachers/:subject', (req, res) => {
    let nome_materia = req.params.subject;
    tutor_per_materia(nome_materia, (err, result) => {
        res.json(result);
    })
});


app.get('/teachers/:id/lezioni', (req, res) => {
    let id_tutor = req.params.id;
    check_res(id_tutor, lezioni => {
        res.json(lezioni);
    })
});

app.get('/teachers/:id/prenotate', (req, res) => {
    let id_tutor = req.params.id;
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
    console.log(user);
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
    console.log("Received request for /verify_auth");
    let user_to_check = { username: req.query.username, password: req.query.password };
    console.log("User to check:", user_to_check);
    check_auth(user_to_check, result => {
        if (result.authenticated) {
            req.session.username = user_to_check.username;
            req.session.authenticated = true;
            req.session.save(err => {
                if (err) {
                    console.error("Error saving session:", err);
                    return res.status(500).json({message: "Errore nel salvataggio della sessione" });
                }
                console.log("Session after save ID:", req.sessionID);
                console.log("Session after save data:", req.session);
                res.cookie('session', req.sessionID, {
                    httpOnly: true,
                    secure: false,
                    domain: 'localhost',
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24
                });
                console.log("Utente autenticato");
                res.json(result);
            });
        } else {
            res.status(401).json({message: 'Utente non autenticato'});
        }
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
