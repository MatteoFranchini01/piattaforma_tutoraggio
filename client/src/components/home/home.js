import React from "react";
import homeCss from "../../css/home.css"
import Card from "../mainLayout/template/card"
import mainImg from "../../images/home.png"
import HowToStartCard from "../mainLayout/template/howToStartCard";
import Accordion from "../mainLayout/template/accordion";

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
                <section className="presentation">
                    <div className="box presentation-box">
                        <h2 className="title">KnowHow: il tuo partner nell'apprendimento!</h2>
                        <p className="presentation-paragraph">
                            KnowHow è qui per accompagnare ogni studente nel raggiungimento dei propri obiettivi
                            scolastici.
                            Grazie al nostro servizio di ripetizioni online, potrai prendere lezioni private da
                            qualsiasi parte del mondo!
                            <br/> <br/>
                            <i className="fa fa-check" aria-hidden="true"> Ripetizioni private online</i> <br/>
                            <i className="fa fa-check" aria-hidden="true"> Insegnanti qualificati</i> <br/>
                            <i className="fa fa-check" aria-hidden="true"> Tantissime materie tra cui scegliere</i>
                        </p>
                    </div>
                    <div className="box image-box">
                        <img alt="mainImg_logo" src={mainImg}></img>
                    </div>
                    <div className="statistics">
                        <div className="numberOfSubjects">
                            <h4 className="statisticsTitle">#</h4>
                            <p>Materie disponibili</p>
                        </div>
                        <div className="numberOfTeachers">
                            <h4 className="statisticsTitle">#</h4>
                            <p>Insegnanti disponibili</p>
                        </div>
                        <div className="numberOfStudents">
                            <h4 className="statisticsTitle">#</h4>
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
                    <div className="row p-5">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </div>
                </section>
                <hr className="centered-hr"/>
                <section className="questions">
                    <h2 className="h2-title">Le domande frequenti</h2>
                    <div className="accordion" id="accordionExample">
                        <Accordion id={1} title={"Domanda 1"} answer={"risposta 1"}/>
                        <Accordion id={2} title={"Domanda 2"} answer={"risposta 2"}/>
                        <Accordion id={3} title={"Domanda 3"} answer={"risposta 3"}/>
                        <Accordion id={4} title={"Domanda 4"} answer={"risposta 4"}/>
                    </div>
                </section>
            </>
        );
    }
}