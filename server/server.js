const http = require('http');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const crypto = require('crypto');

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
    const value = hash.digest('hex');
    return value;
}

//TODO: c'è un problema nel senso che se si aggiunge una card al db e si refresha la pagina crasha tutto
function create_cards(callback) {
    let queryString = 'SELECT * FROM Materie';

    const cards = [];

    pool.query(queryString, function (err, result) {
        if (err) throw err;

        console.log("Executed query: ", result.rows);
        for (let i in result.rows) {
            const temp = {
                id: result.rows[i].ID,
                nome: result.rows[i].NOME,
                prezzo: result.rows[i].PREZZO,
            };

            cards.push(temp);
        }

        callback(cards);
    });
}

// funzione per aggiungere una materia al db
function add_materia(materia) {
    let queryString = 'INSERT INTO MATERIE (NOME, TUTOR_ID, PREZZO) VALUES ($1, $2, $3)';
    const values = [materia.nome, materia.tutor, materia.prezzo];

    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: ", result.rowCount);
    });
}

// funzione per aggiungere utenti

function add_user(utente) {
    const hashedPassord = hashPassword(utente.password);
    let queryString = 'INSERT INTO UTENTI (NOME, COGNOME, PASSWORD, PRIVILEGI) VALUES ($1, $2, $3, $4)';
    const values = [utente.nome, utente.cognome, hashedPassord, utente.privilegi];

    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: ", result.rowCount);
    });
}

// funzione per trovare un utente

function find_user(user_to_find) {
    let queryString = 'SELECT * FROM UTENTI JOIN RUOLI ON PRIVILEGI = ID WHERE UTENTI.NOME = $1 AND UTENTI.COGNOME = $2';

    const user = {};

    pool.query(queryString, [user_to_find.nome, user_to_find.cognome], function (err, result) {
        if (err) throw err;

        console.log("Query executed: ", result.rows);

        for (let i in result.rows) {
            user.id = result.rows[i].ID;
            user.nome = result.rows[i].NOME;
            user.cognome = result.rows[i].COGNOME;
            user.ruolo = result.rows[i].RUOLO_DESC;
        }
    });
}

function count_tutor() {
    let queryString = 'SELECT COUNT(*) FROM TUTOR';

    return new Promise((resolve, reject) => {
        pool.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Query executed: ", result.rows[0].count);
                resolve(result.rows[0].count);
            }
        });
    });
}

function count_user() {
    let queryString = 'SELECT COUNT(*) FROM UTENTI';

    return new Promise((resolve, reject) => {
        pool.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Query executed: ", result.rows[0].count);
                resolve(result.rows[0].count);
            }
        });
    });
}

function count_materie() {
    let queryString = 'SELECT COUNT(*) FROM MATERIE';

    return new Promise((resolve, reject) => {
        pool.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Query executed: ", result.rows[0].count);
                resolve(result.rows[0].count);
            }
        });
    });
}

function check_auth(user_to_check) {
    let queryString = 'SELECT PASSWORD FROM UTENTI WHERE NOME = $1 AND COGNOME = $2';

    let auth = false;

    pool.query(queryString, [user_to_check.nome, user_to_check.cognome], function (err, result) {
        if (err) throw err;

        console.log("Query executed: ", result.rows);

        if (result.rows[0].password == user_to_check.password) {
            auth = true;
        }
    });

    return auth;
}

const createServer = (routes) => {
    const server = http.createServer((req, res) => {
        let route = routes.find((r) => r.path === req.url && r.method === req.method);

        if (route) {
            route.handler(req, res);
        } else {
            res.statusCode = 404;
            res.end("Not Found");
        }
    });

    const port = process.env.PORT || 3000;

    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

    // Chiusura del pool di connessioni dopo la chiusura del server
    process.on('SIGINT', () => {
        pool.end();
        server.close();
    });
};

const routes = [
    {
        method: 'GET',
        path: '/cards',
        handler: (req, res) => {
            create_cards((cards) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(cards));
            });
        }
    },
    {
        method: 'GET',
        path: '/count_tutor',
        handler: (req, res) => {
            count_tutor()
                .then(result => {
                    console.log("Numero tutor: ", result);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ count: result }));
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: 'Errore durante la query' });
                });
        }
    },
    {method: 'GET',
        path: '/count_user',
        handler: (req, res) => {
            count_user()
                .then(result => {
                    console.log("Numero utenti: ", result);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ count: result }));
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: 'Errore durante la query' });
                });
        }
    },
    {
        method: 'GET',
        path: '/count_materie',
        handler: (req, res) => {
            count_materie()
                .then(result => {
                    console.log("Numero materie: ", result);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ count: result }));
                })
                .catch(err => {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Errore durante la query' }));
                });
        }
    },
    {
        method: 'POST',
        path: '/add_materia',
        handler: (req, res) => {
            let materia = req.body;
            add_materia(materia);
            res.end("Materia added to db");
        }
    },
    {
        method: 'POST',
        path: '/add_user',
        handler: (req, res) => {
            let user = req.body;
            add_user(user);
            res.end("User added to db");
        }
    },
    {
        method: 'POST',
        path: '/find_user',
        handler: (req, res) => {
            let user_to_find = req.body;
            let user = find_user(user_to_find);
            res.end(JSON.stringify(user));
        }
    },
    {
        method: 'GET',
        path: '/verify_auth',
        handler: (req, res) => {
            let result = check_auth();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        }
    }
];

createServer(routes);