import React from 'react';
import {Route, Routes, useParams} from 'react-router-dom';
import MainTemplate from "./components/mainLayout/template/mainTemplate";
import Home from "./components/pages/home.js";
import Requirements from "./components/pages/requirements.js";
import Teachers from "./components/pages/teachers.js";
import Tutor from "./components/pages/tutor.js";
import SettingTeacherProfile from "./components/pages/settingTeacherProfile";

function App(){
    const params = useParams();
    return(
        <>
            <MainTemplate>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/requirements" element={<Requirements/>}/>
                    <Route path="/teachers/:subject_id" element={<Teachers subject_id={params.subject_id}/>}/>
                    <Route path="/tutor/:tutor_id" element={<Tutor tutor_id={params.tutor_id}/>}/>
                    <Route path="/settingTeacherProfile" element={<SettingTeacherProfile/>}/>
                </Routes>
            </MainTemplate>
        </>
    );
}

export default App;