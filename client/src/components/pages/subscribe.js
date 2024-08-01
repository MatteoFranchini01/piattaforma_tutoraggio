import React, {useEffect, useState} from "react";
import "../../css/subscribe.css";
import button from "bootstrap/js/src/button";
import {redirect} from "react-router-dom";

export default function SubscribeOverlay ({isOpen, onClose}) {

    //TODO: inserire il necessario all'interno del db
    
    const [selectedType, setSelectedType] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

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

    async function checkUsername(username) {
        let multiple_user_check = false;

        try {
            const response = await fetch(`http://localhost:3000/check_multiple_user?username=${username}`);
            const data = await response.json();
            multiple_user_check = data.result;
            console.log("Richiesta completata, con esisto: ", multiple_user_check);
        } catch (error) {
            console.error('Error:', error);
        }

        return multiple_user_check;
    }

    const onClickHandler = async (event) => {
        const multiple_user_check = await checkUsername(username);

        //TODO: la funzione sotto va bene, però ci sono degli errori nell'inserimento dei dati
        // e il controllo della password va inserito prima di inviare la richiesta al server

        console.log("Multiple user ", multiple_user_check);
        if (selectedType === '' || name === '' || surname === '' || email === '' || username === '' || password === '') {
            setError("Compilare tutti i campi!")
        } else if (multiple_user_check) {
            setError("Scegliere un nuovo username")
        } else {
            checkPasswordStrength(password)
            validateEmail(email);
            setError("")
            const user_to_add = {selectedType, name, surname, email, username, password};
            console.log(user_to_add);
            fetch('http://localhost:3000/add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_to_add),
                crediantials: 'include'
            })
                .then(response => response.json())
                .then(data => console.log(data))
        }

        console.log('Subscribe credentials: ', selectedType, name, surname, username, email, password);
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError('Formato non valido.');
        } else setEmailError("")
        return null;
    }

    function checkPasswordStrength(password) {
        // Initialize variables
        let strength = 0;
        let tips = "";

        // Check password length
        if (password.length < 8) {
            tips += "La password è troppo corta.\n ";
        } else {
            strength += 1;
        }

        // Check for numbers
        if (password.match(/\d/)) {
            strength += 1;
        } else {
            tips += "Inserisci almeno un numero.\n ";
        }

        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        } else {
            tips += "Inserisci almeno un carattere speciale. \n";
        }

        const pwdLabel = document.getElementById("pwdStrength");
        // Return results
        if (strength < 2) {
            pwdLabel.style.color = "red";
            setPasswordStrength("Oh no, troppo facile da indovinare! \n" + tips);
        } else if (strength === 2) {
            pwdLabel.style.color = "orange";
            setPasswordStrength("Abbastanza difficile, ma manca ancora qualcosina! " + tips);
        } else if (strength === 3) {
            pwdLabel.style.color = "green";
            setPasswordStrength("Password difficile. Ottima scelta!" + tips);
        }
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
                                <p id="pwdStrength" className="error-paragraph-subscribe-pwd">{passwordStrength}</p>
                            </div>
                            {error && <p className="error-paragraph-subscribe">{error}</p>}

                            {(selectedType === 'student' || selectedType==='') && (
                                <button className="btn-submit" type="button" value="Submit" onClick={onClickHandler}>Iscriviti</button>
                            )}
                            {selectedType === 'teacher' && (
                                <button className="proceed" type="button" value="proceed" onClick={onClickHandler}> Candidati </button>
                            )}
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}