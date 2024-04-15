const express = require('express')
const app = express()

const cards = [
    {id: 0, nome: "Matematica", prezzo: 20},
    {id: 1, nome: "Fisica", prezzo: 25},
    {id: 2, nome: "Chimica", prezzo: 25},
    {id: 3, nome: "Algebra e geometria", prezzo: 20},
    {id: 4, nome: "Algoritmi e strutture dati", prezzo: 20},
    {id: 5, nome: "FCA", prezzo: 35},
    {id: 6, nome: "Statistica e probabilità", prezzo: 25},
    {id: 7, nome: "Telecomunicazioni", prezzo: 15},
]

app.get('/cards', (req, res) => {
    res.json(cards);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listen to port: ${PORT}`))