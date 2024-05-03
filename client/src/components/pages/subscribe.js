import React, {useEffect, useState} from "react";
import "../../css/subscribe.css";
import button from "bootstrap/js/src/button";

export default function SubscribeOverlay ({isOpen, onClose}) {

    const [selectedType, setSelectedType] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");

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

    const onClickHandler = (event) => {
        if (selectedType === '' || name === '' || surname === '' || email === '' || username === '' || password === '') {
            setError("Compilare tutti i campi!")
        } else {
            setError("")
        }
        validateEmail(email);
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError('Invalid email format');
        } else setEmailError("")
        return null;
    }

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
                                <input type="text" className="form-control txt" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)}/>
                                <input type="text" className="form-control txt" placeholder="Cognome" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                                <input type="email" className="form-control mail" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                {emailError && <p className="error-paragraph-subscribe">{emailError}</p>}
                                <input type="text" className="form-control username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                                <input type="password" className="form-control pwd" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                            {error && <p className="error-paragraph-subscribe">{error}</p>}

                            <div id="selected-value">
                                {selectedType === 'teacher' && (
                                    <div className="input-group">
                                        <input type="file" className="form-control" id="inputGroupFile04"
                                               aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                                    </div>
                                )}
                            </div>
                            {(selectedType === 'student' || selectedType==='') && (
                                <button className="btn-submit" type="button" value="Submit" onClick={onClickHandler}>Iscriviti</button>
                            )}
                            {selectedType === 'teacher' && (
                                <button className="proceed" type="button" value="proceed" onClick={onClickHandler}> Candidati </button>
                            )
                            }
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}