const express = require('express')

class Server {
    constructor() {
        this.app = express()
        this.cards = [
            {id: 0, nome: "Matematica", prezzo: 20},
            {id: 1, nome: "Fisica", prezzo: 25},
            {id: 2, nome: "Chimica", prezzo: 25},
            {id: 3, nome: "Algebra e geometria", prezzo: 20},
            {id: 4, nome: "Algoritmi e strutture dati", prezzo: 20},
            {id: 5, nome: "FCA", prezzo: 35},
            {id: 6, nome: "Statistica e probabilità", prezzo: 25},
            {id: 7, nome: "Telecomunicazioni", prezzo: 15},
        ]
        this.port = process.env.PORT || 3000;
    }

    start() {
        this.app.get("/cards", (req, res) => {
            res.json(this.cards);
        });

        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        });
    }
}

const server = new Server();
server.start();