import {useEffect, useState} from 'react';
import "../../css/settingTeacherProfile.css"
import React from "react";
import img from "../../images/teacher_logo.png"
import SelectDaysTable from "../mainLayout/template/SelectDaysTable";
import { useParams } from "react-router-dom";


export default function SettingTeacherProfile() {

    //username del tutor di cui andrò a memorizzare le info aggiuntive
    const {username} = useParams();
    const [validUsername, setValidUsername] = useState(false)
    // id del tutor
    const [id, setId] = useState("-1")

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    //contiene gli orari attualmente selezionati
    let selectedDays = []

    const [arrayLang, setArrayLang] = React.useState([]);
    const [arrayCompetences, setArrayCompetences] = React.useState([]);
    const [arraySubjects, setArraySubjects] = React.useState([]);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    // id della competenza
    const [selectedCompetence, setSelectedCompetence] = useState("-1");
    // id della lingua
    const [selectedLanguage, setSelectedLanguage] = useState("-1");
    // id della prima materia e rispettivo prezzo
    const [selectedSubjectOne, setSelectedSubjectOne] = useState("-1");
    const [priceOne, setPriceOne] = useState("");
    // id della seconda materia e rispettivo prezzo
    const [selectedSubjectTwo, setSelectedSubjectTwo] = useState("-1");
    const [priceTwo, setPriceTwo] = useState("");
    // id della terza materia e rispettivo prezzo
    const [selectedSubjectThree, setSelectedSubjectThree] = useState("-1");
    const [priceThree, setPriceThree] = useState("");

    useEffect(() => {
        getSubjects()
        getLanguages()
        getCompetences()
        checkUsername()
    }, []);

    useEffect(() => {
        if (!isChecked1) {
            setSelectedSubjectTwo("-1");
            setPriceTwo("0")
        }
    }, [isChecked1]);

    useEffect(() => {
        if (!isChecked2) {
            setSelectedSubjectThree("-1");
            setPriceThree("0")
        }
    }, [isChecked2]);

    function checkUsername(){
        // controllo se l'username è stato correttamente inserito nel db, altrimenti non posso fare nulla

        fetch(`http://localhost:3000/find_id/${username}`)
            .then(response => response.json())
            .then(data => {
                if(data.id !== -1){
                    setValidUsername(true)
                    setId(data.id);
                }
                else
                    setValidUsername(false)

            })
            .catch(error => console.log(error))
    }

    const handleSelectedDaysChange = (selectedCells) =>{
        selectedDays = selectedCells;
        console.log(selectedDays);
    }

    const handleCheckboxChangeTwo = (event) => {
        setIsChecked1(event.target.checked);
    };

    const handleCheckboxChangeThree = (event) => {
        setIsChecked2(event.target.checked);
    };

    function getLanguages() {
        const url = `http://localhost:3000/languages`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    id_lingua: item.id,
                    nome_lingua: item.nome,
                }));
                setArrayLang(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    function getCompetences() {
        const url = `http://localhost:3000/competences`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    id_istruzione: item.id,
                    livello_istruzione: item.nome,
                }));
                setArrayCompetences(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    function getSubjects() {
        const url = `http://localhost:3000/subjects`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    id_materia: item.id,
                    nome_materia: item.nome,
                }));
                setArraySubjects(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    //TODO: una volta memorizzate le info chiamare
    // reindirizzare ("/registrationConfirmed")

    // TODO MATTEO PER FINIRE LA PAGINA
    // Inserire nella tabella tutor materie la tripletta id del tutor, id della materia e prezzo
    // Inserire nella tabella competenze_linguistiche la coppia id del tutor, id della lingua
    // Inserire nella tabella competenze_istr la coppia id del tutor, id della competenza
    // Inserire nella tabella tutor la biografia
    // Inserire le disponibilità

    const handleSubmit = () =>{
        // campi necessari tutti validi
        if(validUsername && selectedCompetence !== "-1" && selectedLanguage !== "-1" && selectedSubjectOne !== "-1" && priceOne){

            if(description.length === 0){
                setDescriptionError("Non hai inserito una breve descrizione di te stesso! ")
            }
            else{
                // qui sono validi username, livello di istruzione, prima materia e lingua
                setDescriptionError("")
                console.log("Username: " + username + " - id: "+id);
                console.log("Livello di istruzione: " + selectedCompetence);
                console.log("Lingua selezionata: " + selectedLanguage);
                console.log("Prima materia: " + selectedSubjectOne + ", prezzo: " + priceOne);

                // qui posso andare a inserire tutti i parametri precedenti

                if(selectedSubjectTwo !== "-1" && priceTwo)
                {
                    console.log("Seconda materia " + selectedSubjectTwo + ", prezzo: " + priceTwo);
                    // qui posso inserire la seconda materia

                    if(selectedSubjectThree !== "-1"){
                        console.log("Terza materia " + selectedSubjectThree + ", prezzo: " + priceThree);
                        //qui posso inserire la terza materia

                    }

                }
            }
        }
        else{
            console.log("Non tutti i campi sono stati compilati.")
        }
    }

    return(
        <>
            <div className="settings">
                <div className="settings-border">
                    {
                        validUsername ?
                            <>
                                <h3 className="settings-h3">Compila il form per completare la registrazione!</h3>
                                <div className="box form-settings">
                                    <div className="section section1">
                                        <p className="paragraph-label">Quale materia desideri insegnare?</p>
                                        <div className="minibox inline-select">
                                            <select className="form-select sub"
                                                    aria-label="Default select example"
                                                    value={selectedSubjectOne}
                                                    onChange={(e) => setSelectedSubjectOne(e.target.value)}>
                                                <option value="-1" disabled>
                                                    Seleziona una materia
                                                </option>
                                                {arraySubjects.map((sub, index) => (
                                                    <option key={sub.id_materia} value={sub.id_materia}>
                                                        {sub.nome_materia}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="minibox inline-text">
                                            <input className="form-control price-text-area" type="number"
                                                   placeholder="Prezzo"
                                                   aria-label="default input example"
                                                   value={priceOne}
                                                   onChange={(e) => setPriceOne(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkbox1"
                                        checked={isChecked1}
                                        onChange={handleCheckboxChangeTwo}
                                        style={{marginTop: '25px'}}
                                    />
                                    <label className="form-check-label sub-label" htmlFor="checkbox1">
                                        Vuoi insegnare una seconda materia?
                                    </label>
                                    <div className="section section2">
                                        <div className="minibox inline-select">
                                            <select className="form-select sub"
                                                    value={selectedSubjectTwo}
                                                    disabled={!isChecked1}
                                                    onChange={(e) => setSelectedSubjectTwo(e.target.value)}>
                                                <option value="-1" disabled>
                                                    Seleziona una materia
                                                </option>
                                                {arraySubjects.map((sub, index) => (
                                                    <option key={sub.id_materia} value={sub.id_materia}>
                                                        {sub.nome_materia}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="minibox inline-text">
                                            <input className="form-control price-text-area" type="number"
                                                   placeholder="Prezzo"
                                                   value={priceTwo}
                                                   disabled={!isChecked1}
                                                   onChange={(e) => setPriceTwo(e.target.value)}
                                            />
                                        </div>

                                    </div>


                                    {
                                        isChecked1 ?
                                            <>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="checkbox2"
                                                    checked={isChecked2}
                                                    onChange={handleCheckboxChangeThree}
                                                    style={{marginTop: '25px'}}
                                                />
                                                <label className="form-check-label sub-label-2" htmlFor="checkbox2">
                                                    Vuoi insegnare una terza materia?
                                                </label>
                                                <div className="section section3">
                                                    <div className="minibox inline-select">
                                                        <select
                                                            className="form-select sub3"
                                                            value={selectedSubjectThree}
                                                            disabled={!isChecked2}
                                                            onChange={(e) => setSelectedSubjectThree(e.target.value)}
                                                        >
                                                            <option value="-1" disabled>
                                                                Seleziona una materia
                                                            </option>
                                                            {arraySubjects.map((sub) => (
                                                                <option key={sub.id_materia} value={sub.id_materia}>
                                                                    {sub.nome_materia}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="minibox inline-text">
                                                        <input className="form-control price-text-area" type="number"
                                                               placeholder="Prezzo"
                                                               aria-label="default input example"
                                                               value={priceThree}
                                                               disabled={!isChecked2}
                                                               onChange={(e) => setPriceThree(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                            : null
                                    }

                                    <p className="paragraph-label">Seleziona il tuo livello di istruzione:</p>
                                    <select className="form-select languages"
                                            aria-label="Default select example"
                                            onChange={(e) => setSelectedCompetence(e.target.value)}>
                                        <option value="-1" disabled>
                                        Seleziona il livello
                                        </option>
                                        {arrayCompetences.map((is, index) => (
                                            <option key={is.id_istruzione} value={is.id_istruzione}>
                                                {is.livello_istruzione}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="paragraph-label"> Seleziona la lingua che padroneggi meglio e nella
                                        quale intendi
                                        fare lezione:</p>
                                    <select
                                        className="form-select languages"
                                        aria-label="Default select example"
                                        onChange={(e) => setSelectedLanguage(e.target.value)}>
                                        <option value="-1" disabled>
                                            Seleziona una lingua
                                        </option>
                                        {arrayLang.map((lang, index) => (
                                            <option key={lang.id_lingua} value={lang.id_lingua}>
                                                {lang.nome_lingua}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="paragraph-label">Inserisci una tua foto, la imposteremo come immagine
                                        del
                                        profilo!</p>
                                    <div className="input-group select-image">
                                        <input type="file" className="form-control" id="inputGroupFile04"
                                               aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                                    </div>


                                    {/*TODO Matteo: aggiungere campo 'descrizione' alla tabella dei tutor MAX 500 caratteri!!!*/}
                                    <p className="paragraph-label">Includi una breve descrizione di te o qualunque cosa
                                        possa
                                        aiutare i tuoi futuri studenti!</p>
                                    <textarea
                                        className="form-control text-area"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={description}
                                        maxLength="500"
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    {descriptionError && <p className="error-paragraph-bio">{descriptionError}</p>}

                                    <p className="paragraph-label">
                                        Seleziona giorni e orari disponibili (puoi modificarli successivamente nel
                                        centro di
                                        gestione account):
                                    </p>
                                    <SelectDaysTable onSelectedDaysChange={handleSelectedDaysChange}/>
                                </div>
                                <div className="box image-subscribe-box">
                                    <img className="sub-img" src={img} alt="subscribe img"/>
                                </div>

                                {/*TODO Matteo: una volta premuto questo bottone, è possibile memorizzare il tutor */}
                                <div className="divWithBtn">
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Iscriviti
                                    </button>
                                </div>
                            </>
                        :
                            <>
                                <div className="error-div">
                                    <h3 className="settings-h3">Username non trovato: non è possibile completare la
                                        registrazione!</h3>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
        ;
}