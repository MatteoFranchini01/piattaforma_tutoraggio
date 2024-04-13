import Navbar from "./Components/navbar";
import Card from "./Components/card";
import {Component} from "react";

class App extends Component {
    subjects = {
        /*da leggere dal databse*/
        cards: [
            {id: 0, nome: "Matematica", prezzo: 20},
            {id: 1, nome: "Fisica", prezzo: 25},
            {id: 2, nome: "Chimica", prezzo: 25},
            {id: 3, nome: "Algebra e geometria", prezzo: 20},
            {id: 4, nome: "Algoritmi e strutture dati", prezzo: 20},
            {id: 5, nome: "FCA", prezzo: 35},
            {id: 6, nome: "Statistica e probabilità", prezzo: 25},
            {id: 7, nome: "Telecomunicazioni", prezzo: 15},
        ]
    }
    render() {
        return (
            <>
                <Navbar/>
                <div className='container'>
                    <h1>Title</h1>
                    <hr/>
                    <div className='row'>
                        {this.subjects.cards.map((card, index) => (
                            <Card
                            key={card.id}
                            nome={card.nome}
                            prezzo={card.prezzo}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default App;
