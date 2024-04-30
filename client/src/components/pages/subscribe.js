import React from "react";
import "../../css/subscribe.css";

export default function SubscribeOverlay ({isOpen, onClose}) {
    return(
        <>
            {
                isOpen ?  (
                    <div className="subscribe-overlay">
                        <div className="overlay_background" onClick={onClose}></div>
                        <div className="overlay_container">
                            <h1>PROVA ISCRIVITI</h1>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}