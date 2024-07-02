import React from 'react';
import "../../css/confirmPrenotation.css"

export default function confirmPrenotation({isOpen, onClose, selectedTime, selectedDay}) {

    //TODO aggiungere la prenotazione al click del bottone
    return(
        <>
            {
                isOpen ? (
                    <div className="confirm-overlay">
                        <div className="overlay_background_confirm" onClick={onClose}></div>
                        <div className="overlay_container_confirm">
                            <h5>Conferma prenotazione</h5>
                            <p className="question">Vuoi prenotare per il giorno {selectedDay} alle ore {selectedTime}?</p>
                            <button type="button" className="btn btn-outline-primary">Conferma</button>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}