import "../../css/tutor.css"
import React from "react";
import Img from "./1.jpg"
import Table from "../mainLayout/template/table"
import ConfirmPrenotation from "./confirmPrenotation";


export default function Tutor({tutor_id}) {
    const [isConfirmPrenotationOverlayOpen, setIsConfirmPrenotationOverlayOpen] = React.useState(false);
    const [selectedTime, setSelectedTime] = React.useState('');
    const [selectedDay, setSelectedDay] = React.useState('');
    const [availability, setAvailability] = React.useState([]);
    const [bookedUp, setBookedUp] = React.useState([]);
    const [info, setInfo] = React.useState([]);

    //TODO debby: passare a questa funzione anche il nome della materia

    React.useEffect(() => {

    })

    function getInfoTutor(tutor_id, nome_materia) {
        const url = `/tutors/${nome_materia}/${id_tutor}`;
        fetch(url)
            .then(response => response.jeons())
            .then(data => {
                const temp = data.map(item => ({
                    nome: item.nome,
                    cognome: item.cognome,
                    prezzo: item.prezzo,
                    rating: item.rating,
                    lingua: item.lingua,
                    livello_istruzione: item.livello_istruzione,
                }));
                setInfo(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    //TODO Matteo: leggere le informazioni relative al tutor
    const tutorName = "Nome Tutor"
    const tutorSurname = "Cognome Tutor"
    const tutorPrice = 15
    const tutorRating = 4;
    const numberOfReviews = 27
    const listOfCompetences = ["Diploma di liceo scientifico", "Laurea in Fisica", "Master di I livello in Fisica Teorica"]
    const listOfLanguages = ["Italiano", "Inglese", "Spagnolo"]

    React.useEffect(() => {
        getLezioniByTutor(tutorName);
        getPrenotazioniByTutor(tutorName);
    }, [tutorName]);

    function getLezioniByTutor(tutor_id) {
        const url = `/tutors/${tutor_id}/lezioni`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const availabilityData = data.map(item => ({
                    time: item.FASCIA_ORARIA,
                    day: item.GIORNO
                }));
                setAvailability(availabilityData);
                console.log(availabilityData);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    function getPrenotazioniByTutor(tutor_id) {
        const url = `/tutors/${tutor_id}/prenotate`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const bookedUpData = data.map(item => ({
                    time: item.FASCIA_ORARIA,
                    day: item.GIORNO
                }));
                setBookedUp(bookedUpData);
                console.log(bookedUpData);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    const handleBookButtonClicked = (time, day) => {
        setIsConfirmPrenotationOverlayOpen(!isConfirmPrenotationOverlayOpen)
        setSelectedTime(time);
        setSelectedDay(day);
        console.log("click");
    };


    return (
        <>
            <div className="main-page-tutor">
                <div className="box tutor-box tutor-presentation">
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
                <div className="box tutor-box tutor-info">
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
                            <Table schedule={availability} bookedUp={bookedUp} onBookButtonClicked={handleBookButtonClicked}/>
                            <ConfirmPrenotation isOpen={isConfirmPrenotationOverlayOpen}
                                                onClose={() => setIsConfirmPrenotationOverlayOpen(!isConfirmPrenotationOverlayOpen)}
                                                selectedTime={selectedTime}
                                                selectedDay={selectedDay}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

