import React, {useState} from "react";
import "../../css/login.css";

export default function LoginOverlay ({isOpen, onClose}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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

        //TODO: da cancellare, serve solo per controllare se funziona l'inserimento - input
        console.log('Login details: ', username, password);
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
                            <a className="pwdForgotten" href="#">Hai dimenticato la password?</a>
                            <button className="btn-login" type="button" value="Submit" onClick={onClickHandler}>Accedi</button>
                        </div>
                    </div>
                </div>
            ) : null
        }
        </>
    );
}