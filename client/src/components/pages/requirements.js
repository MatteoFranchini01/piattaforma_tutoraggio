import React, {useState} from 'react';
import "../../css/requirements.css"
import teacherImg from "../../images/teacher_logo.png"
import CollapseParagraph from "../mainLayout/template/collapseParagraph";

export default function Requirements() {
    return(
        <>
            <div className="main">
                <section className="presentation-teachers">
                    <div className="boxing presentation-box">
                        <h2 className="main-title">Insegna comodamente da casa!</h2>
                        <p className="paragraph">
                            Diventa insegnante online:
                            <br/><br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Scegli tra tantissime materie</i><br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Un posto sicuro per te e per i tuoi studenti</i><br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Lavora da casa o da qualsiasi altro posto tu voglia</i><br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Scegli tu giorni e orari in cui preferisci fare lezione</i><br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Guadagna qualche entrata extra</i><br/>
                        </p>
                    </div>
                    <div className="boxing image-box-teachers">
                        <img src={teacherImg} alt="teacher_logo"/>
                    </div>
                </section>
                <section className="requirements">
                    <div className="buttons">
                        <p>
                            <button className="button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse1`} aria-expanded="false"
                                    aria-controls={`collapse1`}>Quali requisiti devo soddisfare?
                            </button>
                            <button className="button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse2`} aria-expanded="false"
                                    aria-controls={`collapse2`}>Come faccio a diventare tutor?
                            </button>
                            <button className="button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse3`} aria-expanded="false"
                                    aria-controls={`collapse3`}>Cosa mi verrà chiesto in fase di iscrizione?
                            </button>
                            <button className="button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse4`} aria-expanded="false"
                                    aria-controls={`collapse4`}>E se la mia disponibilità cambia?
                            </button>
                        </p>
                    </div>
                    <CollapseParagraph id={1}
                                       answer={"Per diventare tutor, basta essere in possesso di un diploma. Se sei in possesso di un titolo di livello più alto, meglio ancora!"}/>
                    <CollapseParagraph id={2}
                                       answer={"Diventare tutor è semplicissimo! Iscriviti dall'apposito bottone e dopo aver compilato i campi principali, verrai reindirizzato ad una sezione in cui potrai indicare quali sono le tue competenze!"}/>
                    <CollapseParagraph id={3} answer={"In fase di iscrizione ti verrà richiesto di inserire quale sia il tuo livello di istruzione (diploma, laurea di primo livello, laurea magistrale, dottorato) ed in quale lingua hai intenzione di fare lezione. Non dimenticare di inserire una tua foto e una breve descrizione di te per farti conoscere meglio dai tuoi futuri studenti!"}/>
                    <CollapseParagraph id={4} answer={"Non ti preoccupare! Puoi cambiare gli orari e i giorni in cui sei disponibile per fare lezione in qualsiasi momento dal centro di gestione account!"}/>
                </section>
            </div>
        </>
    );
}