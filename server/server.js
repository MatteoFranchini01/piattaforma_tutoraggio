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
        method: 'POST',
        path: '/add_materia',
        hndler: (req, res) => {
            let materia = req.body;
            add_materia(materia);
            res.end("Materia added to db");
        }
    }
];

createServer(routes);