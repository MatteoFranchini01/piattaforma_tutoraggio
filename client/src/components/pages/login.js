import React, {useState} from "react";
import "../../css/login.css";
import {useNavigate} from "react-router-dom";
import {redirect} from "react-router-dom";
import axios from "axios";

export default function LoginOverlay ({isOpen, onClose}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    axios.defaults.withCredentials = true;
    const onClickHandler = (event) => {
        // questa funzione stampa a console i valori inseriti dall'utente
        if(username === ""){
            setUsernameError("Inserire il proprio username!");
        }else {
            setUsernameError("")
        }

        if(password === ""){
            setPasswordError("Inserire la propria password!");
        }else {
            setPasswordError("");
        }

        //TODO: controllare funzionamento e vedere come implementare lato frontend l'evento

        if (username && password) {
            const user_to_check = {username, password};
            fetch(`http://localhost:3000/verify_auth?username=${user_to_check.username}&password=${user_to_check.password}`)
                .then(response => response.json())
                .then(data => {
                    if (data.authenticated) {
                        console.log('User logged in');
                        switch (data.privilegi){
                            case 1:
                                console.log('Root privilege');
                                break;
                            case 2:
                                console.log('Tutor privilege');
                                break;
                            case 3:
                                console.log('User privilege');
                                break;
                            default:
                                console.log('Errore nei permessi');
                                break;
                        }
                        //TODO Matteo: quando lo tesi, se l'autenticazione va a buon fine controlla che il redirect funzioni
                        redirect("/")
                    } else {
                        console.log('User NOT logged in');
                    }
                })
                .catch(error => console.error('Errore durante la chiamata API:', error));
        }
    }

    return(
        <>
        {
            isOpen ?  (
                <div className="login-overlay">
                    <div className="overlay_background" onClick={onClose}></div>
                    <div className="overlay_container">
                        <h2 className="login-title">Accedi a <br/> KnowHow</h2>
                        <div className="input">
                            <input type="text" className="form-control txt" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                            {usernameError && <p className="error-paragraph">{usernameError}</p>}
                            <input type="password" className="form-control pwd" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                            {passwordError && <p className="error-paragraph">{passwordError}</p>}
                        </div>
                        <div className="centeredLink">
                            <button className="btn-login-2" type="button" value="Submit" onClick={onClickHandler}>Accedi</button>
                        </div>
                    </div>
                </div>
            ) : null
        }
        </>
    );
}