import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainTemplate from "./components/mainLayout/template/mainTemplate";
import Home from "./components/pages/home.js";
import Requirements from "./components/pages/requirements.js";
import Teachers from "./components/pages/teachers.js";

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
                        <Route path="/teachers" element={<Teachers/>}/>
                        {/*TODO: una volta modificata la funzione (che vorrà l'id della materia) Teachers i path diventa*/}
                        {/* path="/teachers/{id}" */}
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