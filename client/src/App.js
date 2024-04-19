import Navbar from "./Components/navbar";
import Card from "./Components/card";
import {Component, useEffect, useState} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    /*
    async componentDidMount() {
        const response = await fetch('/cards');
        const data = await response.json();
        this.setState({ cards: data });
    }*/

    render() {
        return (
            <>
                <Navbar/>
                <div className='container'>
                    <div className='row'>
                        {this.state.cards.map((card, index) => (
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