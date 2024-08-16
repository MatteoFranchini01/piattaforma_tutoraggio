import "../../css/tutor.css";
import React from "react";
import Img from "./1.jpg";
import Table from "../mainLayout/template/table";
import { useParams } from "react-router-dom";

export default function Tutor() {
    const { tutor_id, subject_name } = useParams();
    const [isConfirmPrenotationOverlayOpen, setIsConfirmPrenotationOverlayOpen] = React.useState(false);
    const [selectedTime, setSelectedTime] = React.useState('');
    const [selectedDay, setSelectedDay] = React.useState('');
    const [availability, setAvailability] = React.useState([]);
    const [bookedUp, setBookedUp] = React.useState([]);
    const [tutorInfo, setTutorInfo] = React.useState([]);
    const [bio, setBio] = React.useState('');

    const tutorRating = 4;
    const numberOfReviews = 27

    /*const bio= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    */
    React.useEffect(() => {
        getInfoTutor();
        getBio();
    }, []); // Usa [] per eseguire solo al montaggio

    function getInfoTutor() {
        const url = `http://localhost:3000/teachers/${subject_name}/${tutor_id}`;
        console.log("Fetching from URL:", url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched:", data);
                const temp = data.map(item => ({
                    nome: item.nome,
                    cognome: item.cognome,
                    bio: item.bio,
                    prezzo: item.prezzo,
                    lingua: item.lingua,
                    livello_istruzione: item.livello,
                }));
                console.log("Mapped data:", temp);
                setTutorInfo(temp);
                setBio(temp.bio);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    const handleBookButtonClicked = (time, day) => {
        setIsConfirmPrenotationOverlayOpen(!isConfirmPrenotationOverlayOpen);
        setSelectedTime(time);
        setSelectedDay(day);
    };

    // Verifica se tutorInfo ha dati e se è un array con almeno un elemento
    const hasTutorInfo = tutorInfo.length > 0;

    return (
        <>
            <div className="main-page-tutor">
                <div className="box tutor-box tutor-presentation">
                    <div className="tutor-details">
                        {hasTutorInfo ? (
                            <>
                                <img src={Img} alt="Tutor" className="tutor-img"/>
                                <h5 className="tutor-name">{tutorInfo[0].nome}</h5>
                                <p className="tutor-surname">{tutorInfo[0].cognome}</p>
                                <div className="justify-content-between align-items-center tutor-rating">
                                    <div className="ratings">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <i
                                                key={i}
                                                className={`fa fa-star ${i < Math.round(tutorRating) ? 'rating-color' : ''}`}
                                            />
                                        ))}
                                        <p className="tutor-rating-value">Rating: {tutorRating} ({numberOfReviews} recensioni)</p>
                                    </div>
                                </div>
                                <p className="tutor-subject">Materia selezionata: <b>{subject_name}</b></p>
                                <p className="tutor-price">Prezzo di una lezione: <b>{tutorInfo[0].prezzo}.00 €/h</b></p>
                            </>
                        ) : (
                            <p>Caricamento informazioni del tutor...</p>
                        )}
                    </div>
                </div>
                <div className="box tutor-box tutor-info">
                    <div className="tutor-competences">
                        <h4 className="tutor-title">Competenze e lingue</h4>
                        {hasTutorInfo && (
                            <p className="tutor-competences-item">Livello di
                                istruzione: {tutorInfo[0].livello_istruzione}</p>
                        )}
                        {hasTutorInfo && (
                            <p className="tutor-languages-item">Lingua in cui vengono erogate le
                                lezioni: {tutorInfo[0].lingua}</p>
                        )}
                    </div>
                    <hr className="centered-hr"/>
                    <div className="tutor-competences">
                        <h4 className="tutor-title-bio">Descrizione</h4>
                        <p className="tutor-bio">{bio}</p>
                    </div>
                    <hr className="centered-hr"/>
                    <div className="tutor-reservation">
                        <h4 className="tutor-title-reservation">Disponibilità e prenotazione</h4>
                        <div className="tutor-reservation-table">
                            <Table schedule={availability} bookedUp={bookedUp}
                                   onBookButtonClicked={handleBookButtonClicked}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
