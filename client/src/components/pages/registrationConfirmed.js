import React from "react";
import {Link} from "react-router-dom";
import "../../css/registrationConfirmed.css"

export default function RegistrationConfirmed() {

    return(
        <>
            <div className="main-container-registration-confirmed">
                <h3 className="title-registration-confirmed">Registrazione effettuata con successo!</h3>
                <p className="paragraph-registration-confirmed">Clicca sul bottone sottostante per tornare alla pagina home!</p>
                <Link to={"/"}>
                    <button type="button" className="btn btn-primary" style={{marginLeft: '50px'}}>Torna alla home</button>
                </Link>
            </div>
        </>
    );

}