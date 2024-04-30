const http = require('http');
let mysql = require('mysql2');
const bodyParser = require('body-parser');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'matteo',
    password: 'password',
    database: 'db_piattaforma',
})

//TODO: c'è un problema nel senso che se si aggiunge una card al db e si refresha la pagina crasha tutto
function create_cards(callback) {
    connection.connect(
        console.log("Connected...")
    );

    let queryString = 'SELECT * FROM Materie';

    const cards = [];

    connection.query(queryString, function (err, result, fields) {
        if (err) throw err;

        console.log("Executed query: ", result);
        for (let i in result) {
            const temp = {
                id: result[i].ID,
                nome: result[i].NOME,
                prezzo: result[i].PREZZO,
            };

            cards.push(temp);
        }

        callback(cards);
    });

    connection.end();
}

// funzione per aggiungere una materia al db
function add_materia(materia) {
    connection.connect(
        console.log("Connected...")
    )

    let queryString = 'INSERT INTO MATERIE (NOME, TUTOR_ID, PREZZO) VALUES (?, ?, ?)';
    const values = [materia.nome, materia.tutor, materia.prezzo];

    connection.query(queryString, function (err, result, fields) {
        if (err) throw err;
        console.log("Number of records inserted: ", result.affectedRows);
    });

    connection.end();
}

// funzione per aggiungere utenti

function add_user(utente) {
    connection.connect(
        console.log("Connected...")
    )

    let queryString = 'INSERT INTO UTENTI (NOME, COGNOME, PRIVILEGI) VALUE (?, ?, ?)';
    const values = [utente.nome, utente.cognome, utente.privilegi];

    connection.query(queryString, function (err, result, fields) {
        if (err) throw err;
        console.log("Number of records inserted: ", result.affectedRows);
    });

    connection.end();
}

// funzione per trovare un utente

function find_user(user_to_find) {
    connection.connect(
        console.log("Connected...")
    )

    let queryString = 'SELECT * FROM UTENTI JOIN RUOLI ON PRIVILEGI = ID WHERE UTENTI.NOME = ? AND UTENTI.COGNOME = ?'

    const user = {};

    connection.query(queryString, [user_to_find.nome, user_to_find.cognome], function (err, result, fields) {
        if (err) throw err;

        console.log("Query executed: ", result);

        for (let i in result) {
            user.id = result[i].ID;
            user.nome = result[i].NOME;
            user.cognome = result[i].COGNOME;
            user.ruolo = result[i].RUOLO_DESC;
        }
    });

    connection.end();
    return user;
}

function count_tutor() {
    connection.connect(
        console.log("Connected")
    )

    let tutor_num = 0;

    let queryString = 'SELECT COUNT(*) FROM TUTOR';

    connection.query(queryString, function (err, result, fields) {
        if (err) throw err;

        console.log("Query executed: ", result);

        tutor_num = result;
    });

    connection.end();

    return tutor_num;
}

function count_user() {
    connection.connect(
        console.log("Connected")
    )

    let user_count = 0;

    let queryString = 'SELECT COUNT(*) FROM UTENTI';

    connection.query(queryString, function (err, result, fields) {
        if (err) throw err;

        console.log("Query executed: ", result);

        user_count = result;
    });

    connection.end()

    return user_count;
}

function count_materie() {
    connection.connect(
        console.log("Connected")
    )

    let materie_count = 0;

    let queryString = 'SELECT COUNT(*) FROM MATERIE';

    connection.query(queryString, function (err, result, fields) {
        if (err) throw err;

        console.log("Query executed: ", result);

        materie_count = result;
    });

    connection.end()

    return materie_count;
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
            let result = count_tutor();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        }
    },
    {
        method: 'GET',
        path: '/count_user',
        handler: (req, res) => {
            let result = count_user();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        }
    },
    {
        method: 'GET',
        path: '/count_materie',
        handler: (req, res) => {
            let result = count_materie();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        }
    },
    {
        method: 'POST',
        path: '/add_materia',
        hndler: (req, res) => {
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
    }
];

createServer(routes);