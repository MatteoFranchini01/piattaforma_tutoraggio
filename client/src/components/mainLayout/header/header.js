import React from "react";
export default class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#ECEFF1", position:"fixed", width:"100%"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Piattaforma tutoraggio</a>
                    <div className="vr"></div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-3 mb-lg-0 p-lg-1">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Il nostro obiettivo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Prezzi</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Diventare insegnante
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Requisiti</a></li>
                                    <li><a className="dropdown-item" href="#">Invia richiesta</a></li>
                                </ul>
                            </li>
                        </ul>
                        <button className="btn btn-outline-primary" type="submit">Login</button>
                    </div>
                </div>
            </nav>
        );
    }
}