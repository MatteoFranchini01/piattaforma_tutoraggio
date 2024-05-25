import React, {useEffect, useState} from "react";
import homeCss from "../../css/home.css"
import Card from "../mainLayout/template/card"
import mainImg from "../../images/home.png"
import HowToStartCard from "../mainLayout/template/howToStartCard";
import Accordion from "../mainLayout/template/accordion";
import axios from "axios";

export default function Home() {

    // Numero di studenti nel DB

    const [numberOfStudents, setNumberOfStudents] = useState(0);

    // Chiamata API per il conteggio dei tutor

    useEffect(() => {
        console.log('Starting API call');
        fetch('http://localhost:3000/count_students')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response received', data);
                setNumberOfStudents(data.count);
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error);
            });
    }, []);

    // Numero di inseggnanti nel DB

    const [numberOfTeachers, setNumberOfTeachers] = useState(0);

    // Chiamata API per il conteggio dei tutor

    useEffect(() => {
        console.log('Starting API call');
        fetch('http://localhost:3000/count_tutor')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response received', data);
                setNumberOfTeachers(data.count);
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error);
            });
    }, []);

    // Numbero di materie nel DB

    const [numberOfSubject, setNumberOfSubject] = useState(0);

    // Chiamata API per il conteggio delle materie
    useEffect(() => {
        console.log('Starting API call'); // Log per verificare l'inizio della chiamata API
        fetch('http://localhost:3000/count_materie')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response received:', data); // Log per verificare la struttura della risposta
                setNumberOfSubject(data.count); // Accedere al campo 'count' della risposta
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error); // Log in caso di errore
            });
    }, []);

    //TODO lasciare numero fisso e creare pagine menù se ci fossero più card

    const numberOfComponents = 6;
    const componentsArray = Array.from({ length: numberOfComponents }, (_, i) => i);

    return (
            <>
                <section className="presentation">
                    <div className="box presentation-box">
                        <h2 className="title">KnowHow: il tuo partner nell'apprendimento!</h2>
                        <p className="presentation-paragraph">
                            KnowHow è qui per accompagnare ogni studente nel raggiungimento dei propri obiettivi
                            scolastici. <br/>
                            Grazie al nostro servizio di ripetizioni online, potrai prendere lezioni private da
                            qualsiasi parte del mondo!
                            <br/> <br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Ripetizioni private
                                online</i> <br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Insegnanti
                                qualificati</i> <br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Tantissime
                                materie tra cui scegliere</i>
                        </p>
                    </div>
                    <div className="box image-box">
                        <img alt="mainImg_logo" src={mainImg}></img>
                    </div>
                    <div className="statistics">
                        <div className="numberOfSubjects">
                            <h4 className="statisticsTitle">{numberOfSubject}</h4>
                            <p>Materie disponibili</p>
                        </div>
                        <div className="numberOfTeachers">
                            <h4 className="statisticsTitle">{numberOfTeachers}</h4>
                            <p>Insegnanti disponibili</p>
                        </div>
                        <div className="numberOfStudents">
                            <h4 className="statisticsTitle">{numberOfStudents}</h4>
                            <p>Studenti iscritti</p>
                        </div>
                    </div>
                </section>
                <hr className="centered-hr"/>
                <section className="basic">
                    <h2 className="h2-title">Come funziona</h2>
                    <div className="first">
                        <h4 className="basic-titles online"> Ripetizioni individuali online</h4>
                        <p className="basic-paragraph"> Le ripetizioni online individuali offrono un'apprendimento
                            personalizzato, flessibile e interattivo.
                            Gli studenti ricevono attenzione individuale dagli insegnanti, possono pianificare le
                            lezioni secondo i propri orari e utilizzare strumenti tecnologici avanzati per un
                            apprendimento coinvolgente.
                            Questo approccio mirato massimizza il potenziale degli studenti e migliora i risultati
                            accademici in modo efficiente. </p>
                    </div>
                    <div className="box-container">
                        <div className="box second-box">
                            <h4 className="basic-titles grade"> Per ogni scuola ed età</h4>
                            <p className="basic-paragraph">Il nostro servizio di ripetizioni online è adatto a ogni
                                scuola ed età.
                                <br/>Con insegnanti qualificati, offriamo supporto personalizzato per garantire il
                                successo accademico di ogni studente.</p>
                        </div>
                        <div className="box third-box">
                            <h4 className="basic-titles teachers"> Gli insegnanti</h4>
                            <p className="basic-paragraph">I nostri insegnanti sono professionisti qualificati
                                e appassionati, selezionati con cura per garantire un'eccellente esperienza di
                                apprendimento online. <br/>
                                Con competenza e pazienza, aiuteranno gli studenti a raggiungere i propri
                                obiettivi accademici.</p>
                        </div>
                    </div>
                </section>
                <section className="section section-primary howToStartSection">
                    <div className="section-content">
                        <div className="container white-color">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <h2 className="h2-title">Come iniziare</h2>
                                </div>
                            </div>
                            <div className="row">
                                <HowToStartCard
                                    number={1}
                                    what={"Iscriviti!"}
                                    how={"Clicca sul pulsante in alto a destra nella pagina per iscriverti al nostro sito! Sia nel caso tu sia uno studente, sia nel caso tu voglia diventare insegnante."}
                                />

                                <HowToStartCard
                                    number={2}
                                    what={"Scegli la materia e scopri tutti gli insegnanti!"}
                                    how={"Una volta effettuato l'accesso al sito, scegli la materia che vuoi potenziare e scopri tutti i migliori insegnanti."}
                                />
                                <HowToStartCard
                                    number={3}
                                    what={"Prenota un orario e via!"}
                                    how={"Scegli il giorno e l'orario che preferisci in base alle tue esigenze e alla disponibilità dell'insegnate. Dopodichè sarai pronto per la lezione!"}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cards">
                    <h2 className="h2-title">Le materie richieste</h2>
                    <div className="row cards">
                        {componentsArray.map((index) => (
                            <Card key={index} />
                        ))}
                    </div>
                </section>
                <hr className="centered-hr"/>
                <section className="questions">
                    <h2 className="h2-title">Le domande frequenti</h2>
                    <div className="accordion" id="accordionExample">
                        <Accordion id={1} title={"Cos'è KnowHow?"} answer={"KnowHow è una piattaforma online dedicata alle ripetizioni, che mette in contatto studenti con insegnanti qualificati in diverse materie. Offriamo un ambiente virtuale sicuro e interattivo dove gli studenti possono ricevere supporto personalizzato per migliorare le proprie competenze accademiche."}/>
                        <Accordion id={2} title={"A chi è adatto il nostro servizio?"} answer={"Il nostro servizio è adatto a studenti di tutte le età e livelli di istruzione, dalle elementari all'università. Sia che tu stia cercando un aiuto supplementare per superare un esame, migliorare le tue competenze in una materia specifica o approfondire la tua comprensione generale, le nostre ripetizioni online possono essere personalizzate per soddisfare le tue esigenze."}/>
                        <Accordion id={3} title={"Perché scegliere le ripetizioni online?"} answer={"Le ripetizioni online offrono una serie di vantaggi rispetto alle lezioni tradizionali in presenza. Innanzitutto, offrono flessibilità di orario, consentendo agli studenti di pianificare le lezioni in base ai propri impegni. Inoltre, eliminano la necessità di spostamenti, risparmiando tempo e denaro. Le ripetizioni online offrono anche un'ampia gamma di insegnanti qualificati, consentendo agli studenti di trovare l'insegnante che meglio si adatta alle proprie esigenze e stili di apprendimento. Infine, grazie agli strumenti tecnologici disponibili, le ripetizioni online possono essere altrettanto efficaci delle lezioni in presenza, fornendo un'esperienza di apprendimento interattiva e coinvolgente."}/>
                        <Accordion id={4} title={"Quanto costa una lezione?"} answer={"Il costo di una lezione può variare in base all'insegnante e alla materia. Ogni insegnante su KnowHow ha la libertà di fissare il proprio costo in modo indipendente, tenendo conto del proprio livello di esperienza, delle qualifiche e della domanda di mercato. Tuttavia, possiamo garantire che offriamo tariffe competitive e trasparenti, consentendo agli studenti di trovare le ripetizioni che si adattano al loro budget. Per conoscere i costi specifici, ti consigliamo di esplorare i profili degli insegnanti sulla nostra piattaforma o di contattarci direttamente per ulteriori informazioni."}/>
                    </div>
                </section>
            </>
        );
}