import React from "react";
import headerCss from "../../../css/header.css";
import logo from "../../../images/webSiteLogo.png";
import {Link} from "react-router-dom";

import Login from "../../pages/login";
import Subscribe from "../../pages/subscribe";

function Header (){
    const [isLoginOverlayOpen, setIsLoginOverlayOpen] = React.useState(false);
    const [isSubscribeOverlayOpen, setIsSubscribeOverlayOpen] = React.useState(false);

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
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Il nostro obiettivo</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Prezzi</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false">
                                    Diventare insegnante
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Requisiti</Link></li>
                                    <li><Link className="dropdown-item" to="#">Invia richiesta</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <button className="loginBtn" onClick={() => setIsLoginOverlayOpen(!isLoginOverlayOpen)}> Accedi</button>
                        <Login isOpen={isLoginOverlayOpen} onClose={() => setIsLoginOverlayOpen(!isLoginOverlayOpen)}/>
                        <button className="subscribeBtn" onClick={() => setIsSubscribeOverlayOpen(!isSubscribeOverlayOpen)}> Iscriviti</button>
                        <Subscribe isOpen={isSubscribeOverlayOpen} onClose={() => setIsSubscribeOverlayOpen(!isSubscribeOverlayOpen)}/>


                    </div>
                </div>
            </nav>
    );
}

export default Header;