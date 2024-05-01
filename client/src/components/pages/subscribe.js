import React, { useEffect } from "react";
import "../../css/subscribe.css";

export default function SubscribeOverlay ({isOpen, onClose}) {
    useEffect(() => {
        const buttons = document.querySelectorAll('.selectable-button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('selected-value').textContent = this.dataset.value;
            });
        });
        return () => {
            buttons.forEach(button => button.removeEventListener('click', () => {}));
        };
    }, [isOpen]);

    return (
        <>
            {
                isOpen? (
                    <div className="subscribe-overlay">
                        <div className="overlay_background" onClick={onClose}></div>
                        <div className="overlay_container">
                            <h2 className="subscribe-title">Iscriviti</h2>
                            <div className="select-type">
                                <button className="selectable-button" data-value="student">Studente</button>
                                <button className="selectable-button" data-value="teacher">Insegnante</button>
                            </div>
                            <div id="selected-value"></div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}