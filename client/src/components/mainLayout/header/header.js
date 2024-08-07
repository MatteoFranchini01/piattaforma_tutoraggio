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
    const navigate = useNavigate();
    const location = useLocation();

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        checkAuthStatus()}, []);

    //questa funzione è quella da copiare per vedere se l'utente è autenticato oppure no
    const checkAuthStatus = () => {
            fetch("http://localhost:3000/", {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if(data.Status === "Success")
                        setAuth(true)
                    else {
                        setAuth(false);
                        console.log(data.Message)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    const handleLogout = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/logout", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.Status === "Success") {
                    console.log("Logout effettuato correttamente");
                }
                else {
                    console.log("Errore durante il logout");
                }
            })
            .catch((error) => {
                console.error(error);
            });
        checkAuthStatus();
        window.location.reload();
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
                                <div className="logout">
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
                                    <Login
                                        isOpen={isLoginOverlayOpen}
                                        onClose={() => {
                                            checkAuthStatus();
                                            setIsLoginOverlayOpen(!isLoginOverlayOpen);
                                        }}
                                    />
                                    <Subscribe
                                        isOpen={isSubscribeOverlayOpen}
                                        onClose={() => {
                                             setIsSubscribeOverlayOpen(!isSubscribeOverlayOpen);
                                        }}
                                    />
                                </div>
                        }
                    </div>
                </div>
            </nav>
    );
}

export default Header;