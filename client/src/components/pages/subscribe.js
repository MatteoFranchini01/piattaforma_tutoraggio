import React, {useEffect, useState} from "react";
import "../../css/subscribe.css";
import button from "bootstrap/js/src/button";

export default function SubscribeOverlay ({isOpen, onClose}) {

    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const buttons = document.querySelectorAll('.selectable-button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                setSelectedType(this.dataset.value);
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
                            <div className="user-data">
                                <input type="text" className="form-control txt" placeholder="Nome"/>
                                <input type="text" className="form-control txt" placeholder="Cognome"/>
                                <input type="email" className="form-control mail" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Email"/>
                                <input type="text" className="form-control username" placeholder="Username"/>
                                <input type="password" className="form-control pwd" placeholder="Password"/>
                            </div>

                            <div id="selected-value">
                                {selectedType === 'teacher' && (
                                    <div className="input-group">
                                        <input type="file" className="form-control" id="inputGroupFile04"
                                               aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                                    </div>
                                )}
                            </div>
                            {(selectedType === 'student' || selectedType==='') && (
                                <button className="btn-submit" type="button" value="Submit">Iscriviti</button>
                            )}
                            {selectedType === 'teacher' && (
                                <button className="proceed" type="button" value="proceed"> Candidati </button>
                            )
                            }
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}