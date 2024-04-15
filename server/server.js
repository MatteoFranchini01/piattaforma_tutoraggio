const http = require('http');

const cards = [
    {id: 0, nome: "Matematica", prezzo: 20},
    {id: 1, nome: "Fisica", prezzo: 25},
    {id: 2, nome: "Chimica", prezzo: 25},
    {id: 3, nome: "Algebra e geometria", prezzo: 20},
    {id: 4, nome: "Algoritmi e strutture dati", prezzo: 20},
    {id: 5, nome: "FCA", prezzo: 35},
    {id: 6, nome: "Statistica e probabilità", prezzo: 25},
    {id: 7, nome: "Telecomunicazioni", prezzo: 15},
];

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
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(cards));
        }
    },
];

createServer(routes);

