import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainTemplate from "./components/mainLayout/template/mainTemplate";
import Home from "./components/home/home.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    render() {
        return(
            <>
                <MainTemplate >
                    <Home />
                </MainTemplate>
            </>
        );
    }

    /*
    * render() {

      return (
         <BrowserRouter>
            <MainTemplate>
               <Routes>
                   <Route exact path='/' component={Home}/>
               </Routes>
            </MainTemplate>
         </BrowserRouter>
      );
   }
   * */

    /*
    async componentDidMount() {
        const response = await fetch('/cards');
        const data = await response.json();
        this.setState({ cards: data });
    }*/
    
}

export default App;