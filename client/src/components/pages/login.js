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
                        <h1>PROVA LOGIN</h1>
                    </div>
                </div>
            ) : null
        }
        </>
    );
}