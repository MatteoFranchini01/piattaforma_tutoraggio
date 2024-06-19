import React, {Component} from "react";
import "../../css/teachers.css"
import TeachersCard from "../mainLayout/template/teachersCard";

// TODO: da passare l'id della materia alla funzione per avere tutti gli insegnanti correlati a quella materia
export default function Teacher() {

    //TODO calcolare quanti insegnanti sono presenti relativi a quella materia
    const numberOfTeachers = 6;
    const componentsArray = Array.from({ length: numberOfTeachers }, (_, i) => i);

    // ordinare insegnanti per
    // - prezzo
    // - stelline
    // - livello [tutti - primaria - secondaria - superiori - università]

    return(
        <>
            <div className="main-content">
                <div className="box filters">
                    <select className="form-select levels">
                        <option selected>Scegli il livello</option>
                        <option value="tutti">Tutti i livelli</option>
                        <option value="elementari">Elementari</option>
                        <option value="medie">Scuola secondaria</option>
                        <option value="superiori">Scuola superiore</option>
                    </select>
                </div>
                <div className="vr vr-teach"></div>
                <div className="box row teachers-information">
                    {componentsArray.map((index) => (
                        <TeachersCard/>
                    ))}
                </div>
            </div>
        </>
    );
}