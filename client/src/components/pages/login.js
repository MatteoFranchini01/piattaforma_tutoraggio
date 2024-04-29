import React from "react";
import loginCss from "../../css/login.css";

export default function Login () {
    return(
        <div className="login">
            <div className="box logandreg">
                <div className="loginBox">
                    <h2 className="title">Login</h2>
                    <div className="input-group mb-3 username">
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                               aria-describedby="basic-addon1"/>
                    </div>
                    <input type="password" className="form-control password" id="inputPassword2" placeholder="Password"/>
                    <button type="submit" className="btn mb-3">Login</button>
                </div>


                <div className="registrationBox">
                    <h2 className="title">Registrati e unisciti a noi!</h2>
                    <div className="input-group mb-3 username">
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                               aria-describedby="basic-addon1"/>
                    </div>
                    <input type="email" className="form-control email" placeholder="Email" aria-label="Username"/>
                    <input type="password" className="form-control password" id="inputPassword2"
                           placeholder="Password"/>
                    <input type="password" className="form-control password" id="inputPassword2"  placeholder="Conferma password"/>
                    <button type="submit" className="btn mb-3">Registrati</button>
                </div>
            </div>
        </div>
    );
}