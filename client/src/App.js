import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainTemplate from "./components/mainLayout/template/mainTemplate";
import Home from "./components/pages/home.js";
import Requirements from "./components/pages/requirements.js";

function App(){
    /*constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }*/

    //render() {
        return(
            <>
                <MainTemplate>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/requirements" element={<Requirements/>}/>
                    </Routes>
                </MainTemplate>
            </>
        );
    //}
    /*
    async componentDidMount() {
        const response = await fetch('/cards');
        const data = await response.json();
        this.setState({ cards: data });
    }*/
    
}

export default App;