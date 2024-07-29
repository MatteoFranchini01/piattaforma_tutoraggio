import React from "react";
import "../../../css/header.css";
import logo from "../../../images/webSiteLogo.png";
import {Link, useLocation} from "react-router-dom";

import Login from "../../pages/login";
import Subscribe from "../../pages/subscribe";

function Header (){
    const [isLoginOverlayOpen, setIsLoginOverlayOpen] = React.useState(false);
    const [isSubscribeOverlayOpen, setIsSubscribeOverlayOpen] = React.useState(false);
    const location = useLocation();

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
                        <div className="login-subscribe buttons">
                            <button className="loginBtn"
                                    onClick={() => setIsLoginOverlayOpen(!isLoginOverlayOpen)}>Accedi
                            </button>
                            <button className="subscribeBtn" onClick={() => setIsSubscribeOverlayOpen(!isSubscribeOverlayOpen)}>Iscriviti</button>
                            <Login isOpen={isLoginOverlayOpen} onClose={() => setIsLoginOverlayOpen(!isLoginOverlayOpen)}/>
                            <Subscribe isOpen={isSubscribeOverlayOpen} onClose={() => setIsSubscribeOverlayOpen(!isSubscribeOverlayOpen)}/>
                        </div>
                    </div>
                </div>
            </nav>
    );
}

export default Header;