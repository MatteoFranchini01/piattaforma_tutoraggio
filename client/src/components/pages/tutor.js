import "../../css/tutor.css"
import React from "react";
import Img from "./1.jpg"
import Table from "../mainLayout/template/table"

export default function Tutor() {

    const tutorName = "Nome Tutor"
    const tutorSurname = "Cognome Tutor"
    {/*numeri random*/}
    const tutorPrice = 15
    const tutorRating = 4; {/* da arrotondare al numero intero più vicino perchè altrimenti non colora le stelline*/}
    const numberOfReviews = 27
    const listOfCompetences = ["Diploma di liceo scientifico", "Laurea in Fisica", "Master di I livello in Fisica Teorica"]
    const listOfLanguages = ["Italiano", "Inglese", "Spagnolo"]

    const schedule = [
        { time: '08:00', day: 'lun' },
        { time: '10:00', day: 'mar' },
        { time: '11:00', day: 'gio' },
        { time: '18:00', day: 'mer' },
        { time: '19:00', day: 'sab' },
        { time: '16:00', day: 'gio' },
    ];


    return (
        <>
            <div className="main-page-tutor">
                <div className="box tutor-presentation">
                    <div className="tutor-details">
                        <img src={Img} alt="Tutor" className="tutor-img"/>
                        <h5 className="tutor-name">{tutorName}</h5>
                        <p className="tutor-surname">{tutorSurname}</p>
                        <div className="justify-content-between align-items-center tutor-rating">
                            <div className="ratings">
                                {Array.from({length: 5}, (_, i) => (
                                    <i
                                        key={i}
                                        className={`fa fa-star ${i < Math.round(tutorRating) ? 'rating-color' : ''}`}
                                    />
                                ))}
                                <p className="tutor-rating-value">Rating: {tutorRating} ({numberOfReviews} recensioni)</p>
                            </div>
                        </div>
                        <p className="tutor-price">Prezzo di una lezione: <b>{tutorPrice}.00 €/h</b></p>
                    </div>
                </div>
                <div className="box tutor-info">
                    <div className="tutor-competences">
                        <h4 className="tutor-title">Competenze</h4>
                        <ul className="tutor-competences-list">
                            {listOfCompetences.map((competence, index) => (
                                <li className="tutor-competences-item" key={index}>{competence}</li>
                            ))}
                        </ul>
                    </div>
                    <hr className="centered-hr"/>
                    <div className="tutor-languages">
                        <h4 className="tutor-title-languages">Lingue</h4>
                        <ul className="tutor-languages-list">
                            {listOfLanguages.map((language, index) => (
                                <li className="tutor-languages-item" key={index}>{language}</li>
                            ))}
                        </ul>
                    </div>
                    <hr className="centered-hr"/>
                    <div className="tutor-reservation">
                        <h4 className="tutor-title-reservation">Disponibilità e prenotazione</h4>
                        <div className="tutor-reservation-table">
                            <Table schedule={schedule}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

