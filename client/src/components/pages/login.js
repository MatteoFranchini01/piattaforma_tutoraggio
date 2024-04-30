import React from "react";
import "../../css/login.css";

export default function LoginOverlay ({isOpen, onClose}) {
    return(
        <>
        {
            isOpen ?  (
                <div className="login-overlay">
                    <div className="overlay_background" onClick={onClose}></div>
                    <div className="overlay_container">
                        <h2 className="login-title">Accedi a <br/> KnowHow</h2>
                        <div className="input">
                            <input type="text" className="form-control txt" placeholder="Username"/>
                            <input type="password" className="form-control pwd" placeholder="Password"/>
                        </div>
                        <div className="centeredLink">
                            <a className="pwdForgotten" href="#">Hai dimenticato la password?</a>
                            <button className="btn-login" type="button" value="Submit">Accedi</button>
                        </div>
                    </div>
                </div>
            ) : null
        }
        </>
    );
}