import react, {useEffect, useState} from "react";
import "../../css/manageAccount.css"
import React from "react";
import {useParams} from "react-router-dom";

//TODO Debby: far arrivare a questa pagina l'username dell'utente
// + controllare il livello di privilegio per renderizzare cose diverse

export default function ManageAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = useState("");
    const [auth, setAuth] = useState(false); //POI DA TORNARE A FALSE
    const [privilegio, setPrivilegio] = useState(-1); //POI DA TORNARE A FALSE

    useEffect(() => {
        checkAuthStatus()
        check_privilegio()
    }, []);

    const checkAuthStatus = () => {
        fetch("http://localhost:3000/", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.Status === "Success") {
                    setAuth(true)
                    setUsername(data.Username)
                }
                else {
                    setAuth(false);
                    console.log(data.Message)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleEmailChange = () => {
        // controllo validità mail
        if(validateEmail(email)) {
            console.log("Controllo email andato a buon fine")
            //TODO Matteo: update email nella tabella

        }
        else{
            console.log("Controllo email non andato a buon fine")
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

    const handleDeleteAccount = () =>{
        //TODO Matteo; prima va tolta dalla tabella tutor (o discente) e poi da utente -> l'ordine inverso non va
        if(window.confirm("Sei sicuro di voler cancellare l'account?")){
            console.log("Cancellare");
            //TODO gestire cancellazione
        }
        else
            console.log("Non cancellare");
    }

    const handleDelete = (index) => {
        console.log("Cancellare lezione")
    };

    //da implementare
    const check_privilegio = () =>{
        console.log(username)
        // capire privilegio dato username
    }

    // da sostituire con lettura db
    // consiglio: farsi tornare l'id della tabella cosi si sa quale eliminare
    const lezioniPrenotate =  [
        { insegnante:'pinco', materia: 'chimica', giorno: 'lun', orario: '09:00-10:00' },
        { insegnante:'pallino',  materia: 'matematica', giorno: 'mar', orario: '06:00-17:00' },
        { insegnante:'elena',  materia: 'fisica', giorno: 'ven', orario: '09:00-10:00' },
    ];


    return(
        <>
            {
                auth ?
                    <>
                        <div className="main-container-manageAccount">
                            <div className="booked-lessons">
                                <h2 className="title-manage">Benvenuto, {username}!</h2>
                                <h3 className="title-manage">Lezioni prenotate</h3>
                                <div className="lessons">
                                    <table className="table" style={{textAlign: "center"}}>
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Insegnante</th>
                                            <th scope="col">Materia</th>
                                            <th scope="col">Giorno</th>
                                            <th scope="col">Orario</th>
                                            <th scope="col">Cancellazione</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {lezioniPrenotate.map((lezione, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{lezione.insegnante}</td>
                                                <td>{lezione.materia}</td>
                                                <td>{lezione.giorno}</td>
                                                <td>{lezione.orario}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        Elimina
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                            <hr className="centered-hr"/>
                            {/* COMUNE A TUTTI GLI ACCOUNT */}
                            <div className="manage-account">
                                <h3 className="title-manage">Gestione Account</h3>
                                <p className="paragraph-manage">Vuoi cambiare la tua
                                    email?</p>
                                <div className="changeEmail">
                                    <input type="email" className="form-control miniboxemail email"
                                           id="exampleFormControlInput1"
                                           placeholder="name@example.com"
                                           value={email}
                                           onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <button type="button" className="btn btn-warning miniboxemail"
                                            onClick={handleEmailChange}
                                    >Modifica email
                                    </button>
                                </div>
                                {emailError && <p className="error-paragraph-manage">{emailError}</p>}
                                <div className="delete-div">
                                    <p className="paragraph-manage">Vuoi eliminare il tuo account?</p>
                                    <button type="button" className="btn btn-danger dangerBtn"
                                            onClick={handleDeleteAccount}>Cancella
                                        Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="main-container-manageAccount-error" style={{height: "600px", padding: "8% 50px 0"}}>
                            <h3 className="title-manage">Per visualizzare il tuo profilo devi effettuare il login!</h3>
                        </div>
                    </>

            }
        </>
    );

}