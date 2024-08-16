// import dei moduli necessari

const jwt = require("jsonwebtoken")
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const req = require('express/lib/request');

const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

// creazione istanza applicazione Express
const app = express();

// impostazione della porta del server
const port = process.env.PORT || 3000;

// uso del middleware per parsing dei JSON e dei cookie
app.use(express.json())
app.use(cookieParser())

// configurazione CORS
app.use(cors({
    origin: "http://localhost:8080",
    method: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// configurazione della connessione al db PostgreSQL
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

// Funzione per creare le carte delle materie
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

function add_materia_tutor(tutor_materia) {
    let queryString = 'INSERT INTO TUTOR_MATERIE (FK_TUTOR, FK_MATERIA, PREZZO) VALUES ($1, $2, $3)';
    const values = [tutor_materia.id_tutor, tutor_materia.id_materia, tutor_materia.prezzo];
    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        console.log("Result: ", result);
    })
}

function add_comptenzaLing_tutor (tutor_compLing) {
    let queryString = 'INSERT INTO COMPETENZE_LINGUISTICHE (FK_LINGUA, FK_TUTOR) VALUES ($1, $2)';
    const values = [tutor_compLing.id_comp, tutor_compLing.id_tutor];
    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        //console.log("Result: ", result);
    })
}

function add_istr_tutor (tutor_istr) {
    let queryString = 'INSERT INTO COMPETENZE_ISTR (FK_TUTOR, FK_ISTRUZIONE) VALUES ($1, $2)';
    const values = [tutor_istr.id_tutor, tutor_istr.id_istr];
    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        //console.log("Result: ", result);
    })
}

function add_istr_bio (tutor_bio) {
    let queryString = 'UPDATE TUTOR SET BIO=$1 WHERE ID_TUTOR=$2';
    const values = [tutor_bio.bio, tutor_bio.id_tutor];
    pool.query(queryString, values, (err) => {
        if (err) throw err;
    })
}

function change_email (tutor_email_change) {
    let queryString = 'UPDATE TUTOR SET MAIL=$1 WHERE ID_TUTOR=$2';
    const values = [tutor_email_change.mail, tutor_email_change.id_tutor];
    pool.query(queryString, values, (err) => {
        if (err) throw err;
    })
}

async function change_availability (tutor_change_lesson) {
    try {
        let queryString = 'DELETE FROM LEZIONI WHERE FK_TUTOR = $1';
        await pool.query(queryString, [tutor_change_lesson.id_tutor]);
        console.log("Lezioni cancellate")

        for (const item of tutor_change_lesson.lesson) {
            const values = [item.time, item.day];
            queryString = 'SELECT ID_FASCIA_ORARIA AS "ID" FROM FASCE_ORARIE WHERE FASCIA_ORARIA = $1 AND GIORNO = $2';

            const result = await pool.query(queryString, values);

            queryString = 'INSERT INTO LEZIONI (FK_TUTOR, FK_FASCIA_ORARIA) VALUES ($1, $2)';
            await pool.query(queryString, [tutor_change_lesson.id, result.id]);
            console.log("Lezioni agggiornate");
        }
    } catch (err) {
        console.error("Errore durante l'esecuzione della query:", err);
        throw err;
    }
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

// Funzione asincrona per aggiungere utenti
async function add_user(utente) {
    let auth = 0;

    if (utente.selectedType === 'student') {
        auth = 3;
    } else if (utente.selectedType === 'teacher') {
        auth = 2;
    }
    console.log("Auth: ", auth);

    console.log(utente)

    try {
        // inserimento nella tabella utenti
        const queryStringUtenti = 'INSERT INTO UTENTI (USERNAME, PASSWORD, PRIVILEGI) VALUES ($1, $2, $3) RETURNING id_utente';
        const valuesUtenti = [utente.username, utente.hashedPassword, auth];
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
            const queryStringTutor = 'INSERT INTO TUTOR (FK_UTENTE, NOME, COGNOME, MAIL) VALUES ($1, $2, $3, $4)';
            const valuesTutor = [userId, utente.name, utente.surname, utente.email];
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

// Funzione per user duplicati
function check_multiple_username(username_to_check, callback) {
    let queryString = 'SELECT count(*) as count FROM UTENTI WHERE USERNAME = $1';
    console.log("Check multiple username - username_to_check: ", username_to_check.username);
    pool.query(queryString, [username_to_check.username], (err, result) => {
        if (err) throw err;
        const count = result.rows[0].count;
        console.log("Check multiple username - count: ", count);
        if(count === "0")
            callback(null, true);
        else
            callback(null, false);
    });
}

// funzione per controllare le fasce orarie dei tutor
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

// funzione per controllare se una lezione è stata prenotata
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

// funzione per selezionare i tutor per una materia specifica
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

function get_bio(id_tutor, callback) {
    let queryString = 'SELECT INFO FROM TUTOR WHERE ID = $1';
    pool.query(queryString, [id_tutor], (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        const bio = result.bio;
        callback(null, bio);
    })
}

// funzione per ottenere le informazioni dei tutor
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


// Funzione per verificare l'autenticazione
function verify_login(given_username, given_password, callback) {
    let q = 'SELECT USERNAME, PASSWORD, PRIVILEGI FROM UTENTI WHERE USERNAME = $1';
    pool.query(q, [given_username], (err, r) => {
        if (err) throw err;

        if(r.rows.length > 0){
            if(r.rows[0].password === given_password){
                const n = r.rows[0].username;
                const p = r.rows[0].privilegi;
                callback(null, {Status: "Success", Username: n, Privilegio: p})
            }
            else
                callback(null, {Status: "Failed"});
        }
        else{
            callback(null, {Status: "Failed"});
        }
    });
}

// Funzione per vedere se la sessione è attiva
function verifyUser(t, callback){
    if(!t){
        callback(null, {Message: "errore -> no token. Login!"});
    }
    else{
        jwt.verify(t, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if(err){
                callback(null, {Message: "Authentication Error"});
            }
            else{
                callback(null, {Status: "Success", Username: decoded.username, Privilegio: decoded.privilegio});
                //next();
            }
        })
    }
}

//Funzione per leggere tutte le lingue
function select_languages(callback) {
    let queryString = 'SELECT * FROM LINGUE';
    const lang = [];
    pool.query(queryString, (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            lang.push({
                id: row.id_lingua,
                nome: row.nome_lingua
            });
        });
        callback(null, lang);
    })
}

//Funzione per leggere tutti i livelli di istruzione
function select_competences(callback) {
    let queryString = 'SELECT * FROM ISTRUZIONE';
    const lang = [];
    pool.query(queryString, (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            lang.push({
                id: row.id_istruzione,
                nome: row.livello_istruzione
            });
        });
        callback(null, lang);
    })
}

// Funzione per leggere tutte le materie
function select_subject(callback) {
    let queryString = 'SELECT * FROM MATERIE';
    const subj = [];
    pool.query(queryString, (err, result) => {
        if (err) throw err;
        console.log("Executed query: ", result.rows);
        result.rows.forEach(row => {
            subj.push({
                id: row.id_materia,
                nome: row.nome_materia
            });
        });
        callback(null, subj);
    })
}

// Funzione per cercare un id dato l'username
function check_id_from_username(user, callback) {
    let queryString = 'SELECT ID_TUTOR FROM TUTOR JOIN UTENTI ON ID_UTENTE=FK_UTENTE WHERE USERNAME = $1';

    pool.query(queryString, [user], (err, result) => {
        if (err) throw err;

        console.log("Executed query: ", result.rows);
        console.log("Executed query length: ", result.rows.length);
        if(result.rows.length !== 0)
        {
            const id = result.rows[0].id_tutor;
            callback(null, {id: id});
        }
        else
            callback(null, {id: -1});
    });
}

// Rotte
app.get('/get_bio/:id', (req, res) => {
    let id_tutor = req.params.id;

    get_bio(id_tutor, (err, result) => {
        res.json(result);
    })
})

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
    try {
        add_user(user);
        res.json("User added to db");
    } catch {
        console.error("Error adding user");
        res.status(500).json({error: "Failed to upload user"});
    }
});

app.post('/add_bio', (req, res) => {
    let tutor_bio = req.body;
    console.log(tutor_bio);
    try {
        add_istr_bio(tutor_bio);
        res.json("Tutor bio update successfully");
    } catch (err) {
        console.error("Error updating tutor bio:", err);
        res.status(500).json({error: "Failed to update tutor bio"});
    }
});

app.post('/change_email', (req, res) => {
    let tutor_change_email = req.body;
    console.log(tutor_change_email);
    try {
        change_email(tutor_change_email);
        res.json("Tutor email changed");
    } catch (err) {
        console.error("Error changing email", err);
        res.status(500).json({error: "Failed to change email"});
    }
})

app.post('/find_user', (req, res) => {
    let user_to_find = req.body;
    find_user(user_to_find, user => {
        res.json(user);
    });
});

app.post("/verify_login", (req, res) =>{
    if(req.body) {
        verify_login(req.body.user, req.body.pwd, (err, result) => {
            if(result.Status === "Success"){
                console.log("Valid auth")
                const token = jwt.sign({username: result.Username, privilegio: result.Privilegio}, "our-jsonwebtoken-secret-key", {expiresIn: '1h'});
                res.cookie('token', token);
            }
            else
                console.log("Token non creato");
            res.json(result)
        });
    }
    else
        console.log("Request Failed")
})

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({Status: "Success"})
})

app.get('/', (req, res) =>{
    const tok = req.cookies.token
    verifyUser(tok, (err, result) =>{
        res.json(result)
    })
})

app.get('/check_multiple_user', (req, res) => {
    let user_to_check = req.query;
    check_multiple_username(user_to_check, (err, result) => {
        console.log("Esito: ", result);
        res.json({result: result})
    });
})

app.get('/languages', (req, res) => {
    select_languages((err, result) => {
        res.json(result);
    })
});

app.get('/competences', (req, res) => {
    select_competences((err, result) => {
        res.json(result);
    })
});

app.get('/subjects', (req, res) => {
    select_subject((err, result) => {
        res.json(result);
    })
});

app.get('/find_id/:username', (req, res) => {
    check_id_from_username(req.params.username,(err, result) => {
        res.json(result);
    })
});

app.post('/add_tutor_materia', (req, res) => {
    let tutor_materia = req.body;
    console.log(tutor_materia);
    add_materia_tutor(tutor_materia);
    res.json("Tutor per materia added");
})

app.post('/add_compLing', (req, res) => {
    let tutor_compLing = req.body;
    console.log(tutor_compLing);
    add_comptenzaLing_tutor(tutor_compLing);
    res.json("Competenza linguistica aggiunta")
})

app.post('/add_istr', (req, res) => {
    let tutor_istr = req.body;
    console.log(tutor_istr);
    add_istr_tutor(tutor_istr);
    res.json('Istruzione aggiunta')
})

app.get('/languages', (req, res) => {
    select_languages((err, result) => {
        res.json(result);
    })
});


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
