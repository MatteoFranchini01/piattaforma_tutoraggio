import react, {useEffect, useState} from 'react';
import "../../css/settingTeacherProfile.css"
import React from "react";
import img from "../../images/teacher_logo.png"
import SelectDaysTable from "../mainLayout/template/SelectDaysTable";
import { useParams } from "react-router-dom";


export default function SettingTeacherProfile() {

    //username del tutor di cui andrò a memorizzare le info aggiuntive
    const username = useParams();

    //contiene gli orari attualmente selezionati
    let selectedDays = []

    const [arrayLang, setArrayLang] = React.useState([]);
    const [arrayCompetences, setArrayCompetences] = React.useState([]);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    //prendo id tanto è quello che ci interessa inserire all'interno di competenze_linguistiche e competenze_istr, le uniche due tabelle che vanno aggiornate sotto questo punto di vista
    const [selectedCompetence, setSelectedCompetence] = useState("1");
    const [selectedLanguage, setSelectedLanguage] = useState("1");

    useEffect(() => {
        getLanguages()
        getCompetences()
    }, []);

    const handleSelectedDaysChange = (selectedCells) =>{
        selectedDays = selectedCells;
        console.log(selectedDays);
    }

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

    //TODO: una volta memorizzato il tutor chiamare
    // reindirizzare ("/registrationConfirmed")

    const handleSubmit = () =>{
        console.log(username);
        console.log(selectedCompetence);
        console.log(selectedLanguage);

        if(description.length === 0){
            setDescriptionError("Non hai inserito una breve descrizione di te stesso! ")
        }
        else{
            setDescriptionError("")
        }
    }

    {/* TODO Matteo: le informazioni qui sono da unire a quelle inserite nella pagina di subscribe per confermare la registrazione */}
    return(
        <>
            <div className="settings">
                <div className="settings-border">
                    <h3 className="settings-h3">Compila il form per completare la registrazione!</h3>
                    <div className="box form-settings">
                        <p className="paragraph-label">Seleziona il tuo livello di istruzione:</p>
                        <select className="form-select languages"
                                aria-label="Default select example"
                                onChange={(e) => setSelectedCompetence(e.target.value)}>
                            {arrayCompetences.map((is, index) => (
                                <option key={is.id_istruzione} value={is.id_istruzione}>
                                    {is.livello_istruzione}
                                </option>
                            ))}
                        </select>
                        <p className="paragraph-label"> Seleziona la lingua che padroneggi meglio e nella quale intendi
                            fare lezione:</p>
                        <select
                            className="form-select languages"
                                aria-label="Default select example"
                                onChange={(e) => setSelectedLanguage(e.target.value)}>
                            {arrayLang.map((lang, index) => (
                                <option key={lang.id_lingua} value={lang.id_lingua}>
                                    {lang.nome_lingua}
                                </option>
                            ))}
                        </select>
                        <p className="paragraph-label">Inserisci una tua foto, la imposteremo come immagine del
                            profilo!</p>
                        <div className="input-group select-image">
                            <input type="file" className="form-control" id="inputGroupFile04"
                                   aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                        </div>


                        {/*TODO Matteo: aggiungere campo 'descrizione' alla tabella dei tutor MAX 500 caratteri!!!*/}
                        <p className="paragraph-label">Includi una breve descrizione di te o qualunque cosa possa
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
                            Seleziona giorni e orari disponibili (puoi modificarli successivamente nel centro di
                            gestione account):
                        </p>
                        <SelectDaysTable onSelectedDaysChange={handleSelectedDaysChange}/>
                    </div>
                    <div className="box image-subscribe-box">
                        <img className="sub-img" src={img} alt="subscribe img"/>
                    </div>

                    {/*TODO Matteo: una volta premuto questo bottone, è possibile memorizzare il tutor */}
                    <div className="divWithBtn">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Iscriviti</button>
                    </div>
                </div>
            </div>
        </>
    );
}