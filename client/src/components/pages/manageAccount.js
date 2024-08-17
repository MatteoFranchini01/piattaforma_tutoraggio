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
    const [lezioniPrenotate, setLezioniPrenotate] = useState([]);
    const [infoStudent, setInfoStudent] = useState("");

    useEffect(() => {
        checkAuthStatus();
    }, []);

    useEffect(() => {
        if (username && privilegio === 2) {
            checkUsername();
        }
        else if(username && privilegio === 3) {
            checkUsernameStudent()
            info_student()
        }
    }, [username]);

    useEffect(() => {
        get_availability()
    }, [id]);

    const checkAuthStatus = () => {
        fetch("http://localhost:3000/", {
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

    function checkUsernameStudent(){
        fetch(`http://localhost:3000/find_id_student/${username}`)
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
            if (privilegio === 2){
                const tutor_email_change = {
                    email: email,
                    id_tutor: id
                };
                fetch('http://localhost:3000/change_email_tutor', {
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
                        alert("Modifiche effettuate!")
                    })
            }
            else if(privilegio === 3){
                const tutor_email_change = {
                    email: email,
                    id_discente: id
                };
                fetch('http://localhost:3000/change_email_studente', {
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
                        alert("Modifiche effettuate!")
                    })
            }

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

    const handleDelete = (index, id_lezione) => {
        console.log("Cancellare lezione")
        const url = `http://localhost:3000/delete/${id_lezione}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.Status === "Success"){
                    alert("Cancellazione effettuata correttamente")
                    window.location.reload();
                }
            })
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
                    alert("Modifiche effettuate!")
                })
        }
        else{
            setNewBioError("Se vuoi cambiare la tua bio, scrivi qualcosa!")
        }

    }

    function get_availability() {
        const url = `http://localhost:3000/booked/${id}/${privilegio}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLezioniPrenotate(data);
            })
    }

    let selectedDays = []
    const handleSelectedDaysChange = (selectedCells) =>{
        selectedDays = selectedCells;
        console.log(selectedDays);
    }

    function add_availability(id_tutor, selectedDays) {
        const tutor_add_ava = {
            id_tutor: id_tutor,
            selectedDays: selectedDays
        };
        fetch('http://localhost:3000/change_availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutor_add_ava),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Modifiche effettuate!")
            })
            .catch(error => console.log(error))
    }

    const handleConfirmSelectedDays = () => {
        if (selectedDays.length > 0) {
            console.log("Cambio disponibilità");
            add_availability(id, selectedDays);

        } else {
            alert("Non hai selezionato nessun giorno in cui sei disponibile!");
        }
    }

    function info_student() {
        const url = `http://localhost:3000/info_studente/${id}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setInfoStudent(data)
            })
    }


    return(
        <>
            {
                auth ?
                    <>
                        <div className="main-container-manageAccount">
                            <h2 className="title-manage">Benvenuto, {username}!</h2>
                            <div className="info-generale">
                                <h3 className="title-manage">Info generali</h3>
                                <p>Nome: {infoStudent.nome}</p>
                                <p>Cognome: {infoStudent.cognome}</p>
                                <p>Username: {infoStudent.username}</p>
                            </div>
                            <hr className="centered-hr"/>
                            <div className="booked-lessons">
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
                                                    privilegio === 3 ?
                                                        <td scope="col">{lezione.tutor}</td>
                                                        :
                                                        <td scope="col">{lezione.studente}</td>
                                                }
                                                <td>{lezione.nome_materia}</td>
                                                <td>{lezione.giorno}</td>
                                                <td>{lezione.fascia_oraria}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(index, lezione.id_lezione)}
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
                                                <p className="paragraph-manage-bio">Vuoi modificare la tua
                                                    biografia?</p>
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