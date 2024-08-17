import React, {useEffect, useState} from "react";
import "../../css/subscribe.css";
import {useNavigate} from "react-router-dom";

import hash from 'hash.js';

export default function SubscribeOverlay ({isOpen, onClose}) {
    const navigate = useNavigate()

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

    const onClickHandler = async () => {
        const multiple_user_check = await checkUsername(username);

        console.log("Multiple user ", multiple_user_check);
        if (selectedType === '' || name === '' || surname === '' || email === '' || username === '' || password === '') {
            setError("Compilare tutti i campi!")
        } else if (!multiple_user_check) {
            setError("Scegliere un nuovo username")
        } else {
            const isPasswordValid = checkPasswordStrength(password);
            const isEmailValid = validateEmail(email);
            if(isPasswordValid && isEmailValid) {
                setError("")
                let hashedPassword = hashPassword(password);
                const user_to_add = {selectedType, name, surname, email, username, hashedPassword};
                console.log(user_to_add);
                fetch('http://localhost:3000/add_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user_to_add),
                    credentials: 'include'
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        setSelectedType("");
                        setName("");
                        setSurname("");
                        setEmail("");
                        setUsername("");
                        setPassword("");

                        if(data === "User added to db")
                        {
                            onClose(true)
                            if(selectedType === "student"){
                                /*alert("Registrazione avvenuta con successo!")*/
                                navigate("/registrationConfirmed");
                            }
                            else{
                                navigate(`/settingTeacherProfile/${username}`)
                            }
                        }
                        else{
                            alert("Registrazione non avvenuta!")
                        }

                    })
                    .catch(error => console.log(error))

            }
        }
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError('Formato non valido.');
            return false
        } else {
            setEmailError("")
            return true
        }
    }

    function hashPassword(password) {
        return hash.sha256().update(password).digest('hex');
    }

    function checkPasswordStrength(password) {
        let strength = 0;
        let tips = "";

        if (password.length < 8) {
            tips += "La password è troppo corta.\n ";
        } else {
            strength += 1;
        }

        if (password.match(/\d/)) {
            strength += 1;
        } else {
            tips += "Inserisci almeno un numero.\n ";
        }

        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        } else {
            tips += "Inserisci almeno un carattere speciale. \n";
        }

        const pwdLabel = document.getElementById("pwdStrength");

        if (strength < 2) {
            pwdLabel.style.color = "red";
            setPasswordStrength("Oh no, troppo facile da indovinare! \n" + tips);
            return false
        } else if (strength === 2) {
            pwdLabel.style.color = "orange";
            setPasswordStrength("Abbastanza difficile, ma manca ancora qualcosina! " + tips);
            return false
        } else if (strength === 3) {
            pwdLabel.style.color = "green";
            setPasswordStrength("Password difficile. Ottima scelta!" + tips);
            return true
        }
        return false;
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