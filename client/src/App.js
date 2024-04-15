import Navbar from "./Components/navbar";
import Card from "./Components/card";
import {Component, useEffect, useState} from "react";
import axios from 'axios';

import data from "bootstrap/js/src/dom/data";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    async componentDidMount() {
        const response = await fetch('/cards');
        const data = await response.json();
        this.setState({ cards: data });
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className='container'>
                    <h1>Title</h1>
                    <hr/>
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