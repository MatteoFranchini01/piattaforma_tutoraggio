import "../../css/tutor.css";
import React, {useState} from "react";
import Img from "./1.jpg";
import Table from "../mainLayout/template/table";
import { useParams } from "react-router-dom";

export default function Tutor() {
    const { tutor_id, subject_name } = useParams();
    const [selectedTime, setSelectedTime] = React.useState('');
    const [selectedDay, setSelectedDay] = React.useState('');
    const [availability, setAvailability] = React.useState([]);
    const [bookedUp, setBookedUp] = React.useState([]);
    const [tutorInfo, setTutorInfo] = React.useState([]);

    const [username, setUsername] = useState("");
    const [auth, setAuth] = useState(false);
    const [privilegio, setPrivilegio] = useState(-1);

    const tutorRating = 4;
    const numberOfReviews = 27

    React.useEffect(() => {
        getInfoTutor();
        getLezioniByTutor()
        getPrenotazioniByTutor()
        checkAuthStatus()
    }, []);

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
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    const handleBookButtonClicked = (time, day) => {
        setSelectedTime(time);
        setSelectedDay(day);

        if(auth && privilegio === 3){ // si puo prenotare solo se si è studenti
            if(window.confirm("Vuoi prenotare la lezione per "+selectedDay+" alle ore "+selectedTime+"?")){
                console.log("Prenotare");
                const lesson_info = {
                    fascia_oraria: time,
                    giorno: day,
                    username: username,
                    id_tutor: tutor_id,
                    materia: subject_name
                }
                fetch('http://localhost:3000/book_lesson', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(lesson_info),
                    credentials: 'include'
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        alert("Lezione prenotata!")
                        window.location.reload();
                    })
            }
            else
                console.log("Non prenotare");
        }



    };

    function getLezioniByTutor() {
        const url = `http://localhost:3000/lezioni/${tutor_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const availabilityData = data.map(item => ({
                    time: item.fascia,
                    day: item.giorno
                }));
                setAvailability(availabilityData);
                console.log(availabilityData);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    function getPrenotazioniByTutor() {
        const url = `http://localhost:3000/prenotate/${tutor_id}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const bookedUpData = data.map(item => ({
                    time: item.fascia,
                    day: item.giorno
                }));
                setBookedUp(bookedUpData);
                console.log(bookedUpData);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

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
                        <p className="tutor-bio">{tutorInfo[0]?.bio || "Bio non disponibile"}</p>
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
