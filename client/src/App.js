import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainTemplate from "./components/mainLayout/template/mainTemplate";
import Home from "./components/pages/home.js";
import Requirements from "./components/pages/requirements.js";
import Teachers from "./components/pages/teachers.js";
import Tutor from "./components/pages/tutor.js";
import SettingTeacherProfile from "./components/pages/settingTeacherProfile";
import RegistrationConfirmed from "./components/pages/registrationConfirmed";
import PriceAndGoals from "./components/pages/priceAndGoals";



function App(){
    return(
        <>
            <MainTemplate>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/requirements" element={<Requirements/>}/>
                    <Route path="/prezzieobiettivi" element={<PriceAndGoals/>}/>
                    <Route path="/teachers/:subject_name" element={<Teachers/>}/>
                    <Route path="/teachers/:subject_name/:tutor_id" element={<Tutor/>}/>
                    <Route path="/settingTeacherProfile/:username" element={<SettingTeacherProfile/>}/>
                    <Route path="/registrationConfirmed" element={<RegistrationConfirmed/>}/>
                </Routes>
            </MainTemplate>
        </>
    );
}

export default App;