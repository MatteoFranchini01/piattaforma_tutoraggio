import react, {useEffect, useState} from 'react';
import "../../css/settingTeacherProfile.css"
import React from "react";
import img from "../../images/teacher_logo.png"
import SelectDaysTable from "../mainLayout/template/SelectDaysTable";

export default function SettingTeacherProfile() {

    //contiene gli orari attualmente selezionati
    let selectedDays = []

    const handleSelectedDaysChange = (selectedCells) =>{
        selectedDays = selectedCells;
        console.log(selectedDays);
    }


    {/* TODO Matteo: le informazioni qui sono da unire a quelle inserite nella pagina di subscribe per confermare la registrazione */}
    return(
        <>
            <div className="settings">
                <div className="settings-border">
                    <h3 className="settings-h3">Compila il form per completare la registrazione!</h3>
                    <div className="box form-settings">
                        <p className="paragraph-label">Seleziona il tuo livello di istruzione:</p>
                        <select defaultValue={"Diploma"} className="form-select certificates" aria-label="Default select example">
                            <option value="Diploma">Diploma</option>
                            <option value="Laurea">Laurea</option>
                            <option value="Laurea Magistrale">Laurea Magistrale</option>
                            <option value="Master">Master</option>
                        </select>
                        <p className="paragraph-label"> Seleziona la lingua che padroneggi meglio e nella quale intendi
                            fare lezione:</p>
                        <select defaultValue={"Italiano"} className="form-select languages" aria-label="Default select example">
                            <option value="Italiano">Italiano</option>
                            <option value="Inglese">Inglese</option>
                            <option value="Spagnolo">Spagnolo</option>
                            <option value="Francese">Francese</option>
                            <option value="Tedesco">Tedesco</option>
                        </select>
                        <p className="paragraph-label">Inserisci una tua foto, la imposteremo come immagine del
                            profilo!</p>
                        <div className="input-group select-image">
                            <input type="file" className="form-control" id="inputGroupFile04"
                                   aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                        </div>


                        {/*TODO Matteo: aggiungere campo 'descrizione' alla tabella dei tutor!!!*/}
                        <p className="paragraph-label">Includi una breve descrizione di te o qualunque cosa possa
                            aiutare i tuoi futuri studenti!</p>
                        <textarea className="form-control text-area" id="exampleFormControlTextarea1"
                                  rows="3"></textarea>

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
                        <button type="button" className="btn btn-primary">Iscriviti</button>
                    </div>
                </div>
            </div>
        </>
    );
}