import React, {useEffect, useState} from "react";
import "../../../css/header.css";
import logo from "../../../images/webSiteLogo.png";
import {Link, useLocation, useNavigate} from "react-router-dom";

import Login from "../../pages/login";
import Subscribe from "../../pages/subscribe";
import axios from "axios";

function Header (){
    const [isLoginOverlayOpen, setIsLoginOverlayOpen] = React.useState(false);
    const [isSubscribeOverlayOpen, setIsSubscribeOverlayOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    //axios.defaults.withCredentials = false;

    useEffect(() => {
        /*axios.get("http://localhost:3000/test")
            .then(res => {
                if(res.data.Status === "Success"){
                    setAuth(true);
                }
                else{
                    setMessage(res.data.Message);
                    console.log(message)
                }
            })*/

        fetch("http://localhost:3000/test", {
            method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                if(data.Status === "Success")
                    setAuth(true)
                else {
                    setMessage(data.Message)
                    //alert(message);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);




    const handleLogout = (e) => {
        e.preventDefault();
        /*axios.post("http://localhost:3000/logout")
            .then(res => {
                if(res.data.Status === "Success") {
                    navigate("/");
                }
                else{
                    alert(res.data.Message);
                }

            })
            .catch(err => console.log(err));*/
    }


    return (
            <nav className="navbar fixed-top navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img alt="logo" src={logo} className="logo-image m-lg-3"></img>
                        KnowHow
                    </Link>
                    <div className="vr"></div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-3 mb-lg-0 p-lg-1">
                            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/prezzieobiettivi' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/prezzieobiettivi">Prezzi & Obiettivi</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/requirements' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/requirements">Diventare insegnante</Link>
                            </li>
                        </ul>

                        {
                            auth ?
                                <div className="logout button">
                                    <button className="logoutBtn"
                                            onClick={handleLogout}>Logout
                                    </button>

                                </div>
                                :
                                <div className="login-subscribe buttons">
                                    <button className="loginBtn"
                                            onClick={() => setIsLoginOverlayOpen(!isLoginOverlayOpen)}>Accedi
                                    </button>
                                    <button className="subscribeBtn"
                                            onClick={() => setIsSubscribeOverlayOpen(!isSubscribeOverlayOpen)}>Iscriviti
                                    </button>
                                    <Login isOpen={isLoginOverlayOpen}
                                           onClose={() => setIsLoginOverlayOpen(!isLoginOverlayOpen)}/>
                                    <Subscribe isOpen={isSubscribeOverlayOpen}
                                               onClose={() => setIsSubscribeOverlayOpen(!isSubscribeOverlayOpen)}/>
                                </div>
                        }

                    </div>
                </div>
            </nav>
    );
}

export default Header;