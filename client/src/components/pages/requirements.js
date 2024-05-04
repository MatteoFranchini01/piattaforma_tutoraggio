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
                            Diventa insegnante online!
                            <br/><br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Scegli tra tantissime materie</i><br/>
                            <i className="fa fa-check" aria-hidden="true"><span className="tab"></span>Un posto sicuro per te e per i tuoi studenti</i><br/>
                        </p>
                    </div>
                    <div className="boxing image-box">
                        <img className="teacherImg" src={teacherImg} alt="teacher_logo"/>
                    </div>
                </section>
                <section className="requirements">
                    <div className="buttons">
                        <p>
                            <button className="button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse1`} aria-expanded="false"
                                    aria-controls={`collapse1`}>Domanda 1
                            </button>
                            <button className="button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse2`} aria-expanded="false"
                                    aria-controls={`collapse2`}>Domanda 2
                            </button>
                            <button className="button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse3`} aria-expanded="false"
                                    aria-controls={`collapse3`}>Domanda 3
                            </button>
                        </p>
                    </div>
                    <CollapseParagraph id={1} answer={"prova 1"}/>
                    <CollapseParagraph id={2} answer={"prova 2"}/>
                    <CollapseParagraph id={3} answer={"prova 3"}/>
                </section>
            </div>
        </>
    );
}