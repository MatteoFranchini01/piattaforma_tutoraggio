import React, {useState} from "react";
import "../../css/login.css";
import {useLocation, useNavigate} from "react-router-dom";
import hash from 'hash.js';

export default function LoginOverlay ({isOpen, onClose}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    function hashPassword(password) {
        return hash.sha256().update(password).digest('hex');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

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

        if (username && password) {
            let hashedPassword = hashPassword(password);
            const cred = {
                user: username,
                pwd: hashedPassword,
            }

            fetch("http://localhost:3000/verify_login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cred),
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    //OK
                    if(data.Status === "Success"){
                        onClose(true);
                        navigate("/")
                    }
                    else {
                        console.log(data.Status);
                        setLoginError("Autenticazione fallita");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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
                            {loginError && <p className="error-paragraph-auth">{loginError}</p>}
                        </div>
                        <div className="centeredLink">
                            <button className="btn-login-2" type="button" value="Submit" onClick={handleSubmit}>Accedi</button>
                        </div>
                    </div>
                </div>
            ) : null
        }
        </>
    );
}