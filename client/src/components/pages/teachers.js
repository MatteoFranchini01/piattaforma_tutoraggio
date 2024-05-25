import {Component} from "react";
import "../../css/teachers.css"
import TeachersCard from "../mainLayout/template/teachersCard";

// TODO: da passare l'id della materia alla funzione per avere tutti gli insegnanti correlati a quella materia
export default function Teacher() {
    return(
        <>
            <div className="main-content">
                <div className="filters"></div>
                <div className="teachers-information">
                    <TeachersCard/>
                </div>
            </div>
        </>
    );
}