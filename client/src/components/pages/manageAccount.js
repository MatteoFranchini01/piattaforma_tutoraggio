import react, {useEffect, useState} from "react";
import "../../css/manageAccount.css"
import React from "react";
import {useParams} from "react-router-dom";
import SelectDaysTable from "../mainLayout/template/SelectDaysTable";

export default function ManageAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = useState("");
    const [auth, setAuth] = useState(false);
    const [privilegio, setPrivilegio] = useState(-1);
    const [newBio, setNewBio] = useState("");
    const [newBioError, setNewBioError] = useState("");
    const [id, setId] = useState(-1)

    useEffect(() => {
        checkAuthStatus().then(() => {
            checkUsername();
        });
    }, []);


    const checkAuthStatus = () => {
        return fetch("http://localhost:3000/", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.Status === "Success") {
                    setAuth(true)
                    setUsername(data.Username)
                    setPrivilegio(data.Privilegio);
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

    function checkUsername(){
        // controllo se l'username è stato correttamente inserito nel db, altrimenti non posso fare nulla
        fetch(`http://localhost:3000/find_id/${username}`)
            .then(response => response.json())
            .then(data => {
                if(data.id !== -1){
                    setId(data.id);
                }
                else
                    setId(-1)

            })
            .catch(error => console.log(error))
    }

    const handleEmailChange = () => {
        // controllo validità mail
        if(validateEmail(email)) {
            console.log("Controllo email andato a buon fine")
            const tutor_email_change = {
                email: email,
                id_tutor: id
            };
            fetch('http://localhost:3000/change_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tutor_email_change),
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
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
        // TODO Matteo: cancellare lezione dal db
    };

    const handleBioChange = () =>{
        if(newBio !== ""){
            setNewBioError("")
            const tutor_to_add = {
                id_tutor: id,
                bio: newBio
            };
            fetch('http://localhost:3000/add_bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tutor_to_add),
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
        }
        else{
            setNewBioError("Se vuoi cambiare la tua bio, scrivi qualcosa!")
        }

    }

    //TODO Matteo: leggere il db per riempire l'array e visualizzare le prenotazioni relativa allo studente o al tutor
    // il privilegio lo trovi già nella variabile privilegio

    // da sostituire con lettura db
    // consiglio: farsi tornare l'id della tabella cosi si sa quale eliminare
    // da inserire anche i contatti di studente e professore, quindi le mail di entrambi
    const lezioniPrenotate =  [
        { studente:'elena', insegnante:'pinco', materia: 'chimica', giorno: 'lun', orario: '09:00-10:00' },
        { studente:'elena', insegnante:'pallino',  materia: 'matematica', giorno: 'mar', orario: '06:00-17:00' },
        { studente:'elena', insegnante:'elena',  materia: 'fisica', giorno: 'ven', orario: '09:00-10:00' },
    ];

    let selectedDays = []
    const handleSelectedDaysChange = (selectedCells) =>{
        selectedDays = selectedCells;
        console.log(selectedDays);
    }

    const handleConfirmSelectedDays = () => {
        if (selectedDays.length > 0) {
            console.log("Cambio disponibilità");


        } else {
            //TODO debby: settare un errore in questo caso
        }
    }


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
                                            {
                                                privilegio === 1 ?
                                                    <th scope="col">Insegnante</th>
                                                :
                                                <th scope="col">Studente</th>
                                            }
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
                                                {
                                                    privilegio === 1 ?
                                                        <td scope="col">{lezione.insegnante}</td>
                                                        :
                                                        <td scope="col">{lezione.studente}</td>
                                                }
                                                <td>{lezione.materia}</td>
                                                <td>{lezione.giorno}</td>
                                                <td>{lezione.orario}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        Cancella
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <hr className="centered-hr"/>
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
                                    {emailError && <p className="error-paragraph-manage">{emailError}</p>}
                                </div>


                                {
                                    privilegio === 2 ?
                                        <>
                                            <div className="changeDays-div">
                                                <p className="paragraph-label">
                                                    Vuoi cambiare i giorni in cui sei disponibile per le lezioni?
                                                </p>
                                                <SelectDaysTable onSelectedDaysChange={handleSelectedDaysChange}/>
                                                <button type="button" className="btn btn-warning"
                                                        onClick={handleConfirmSelectedDays}
                                                >Modifica disponibilità
                                                </button>
                                            </div>
                                        </> : null
                                }
                                {

                                    privilegio === 2 ?
                                        <>
                                            <div className="changeBio-div">
                                                <p className="paragraph-manage-bio">Vuoi modificare la tua biografia?</p>
                                                <textarea
                                                    className="form-control text-area"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    value={newBio}
                                                    maxLength="500"
                                                    style={{marginBottom: '20px'}}
                                                    onChange={(e) => setNewBio(e.target.value)}
                                                ></textarea>

                                                <button type="button" className="btn btn-warning"
                                                        onClick={handleBioChange}
                                                >Modifica la tua biografia
                                                </button>
                                                {newBioError && <p className="error-paragraph-manage">{newBioError}</p>}
                                            </div>
                                        </>
                                        : null

                                }

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
                        <div className="main-container-manageAccount-error"
                             style={{height: "600px", padding: "8% 50px 0"}}>
                            <h3 className="title-manage">Per visualizzare il tuo profilo devi effettuare il login!</h3>
                        </div>
                    </>

            }
        </>
    );

}