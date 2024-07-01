import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainTemplate from "./components/mainLayout/template/mainTemplate";
import Home from "./components/pages/home.js";
import Requirements from "./components/pages/requirements.js";
import Teachers from "./components/pages/teachers.js";
import Tutor from "./components/pages/tutor.js";

function App(){
    return(
        <>
            <MainTemplate>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/requirements" element={<Requirements/>}/>
                    <Route path="/teachers" element={<Teachers/>}/>
                    {/*TODO: una volta modificata la funzione (che vorrà l'id della materia) Teachers i path diventa*/}
                    {/* path="/teachers/{id}" */}

                    <Route path="/tutor" element={<Tutor/>}/>
                    {/*TODO: una volta modificata la funzione (che vorrà l'id del tutor) Teachers i path diventa*/}
                    {/* path="/tutor/{id}" */}
                </Routes>
            </MainTemplate>
        </>
    );
}

export default App;