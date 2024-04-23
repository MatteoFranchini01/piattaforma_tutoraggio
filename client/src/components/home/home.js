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
        return(
            <>
                <section className="presentation">
                    <div className="box presentation-box">
                        <h2 className="title">Piattaforma tutoraggio</h2>
                        <p className="presentation-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aenean consectetur venenatis maximus. Nunc lobortis blandit quam, nec efficitur massa
                            accumsan quis. Cras iaculis lacinia nisl vitae tincidunt. Aliquam hendrerit, tellus laoreet
                            consectetur dignissim, mauris nulla ultricies elit, ut interdum orci erat a orci. Donec
                            accumsan condimentum nulla sed pellentesque. Cras facilisis, tellus quis commodo suscipit,
                            quam lectus venenatis dui, a dictum elit elit at augue. Donec eget cursus eros.</p>
                    </div>
                    <div className="box image-box">
                        <img alt="mainImg_logo" src={mainImg}></img>
                    </div>
                </section>

                <section className="section section-primary howToStartSection">
                    <div className="section-content">
                        <div className="container white-color">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <h2 className="h2-title">come iniziare</h2>
                                </div>
                            </div>
                            <div className="row">
                                <HowToStartCard
                                    number={1}
                                    what={"cosa fare"}
                                    how={"come farlo"}
                                />

                                <HowToStartCard
                                    number={2}
                                    what={"cosa fare"}
                                    how={"come farlo"}
                                />
                                <HowToStartCard
                                    number={3}
                                    what={"cosa fare"}
                                    how={"come farlo"}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cards">
                    <h2 className="h2-title">le materie richieste</h2>
                    <div className="row p-5">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </div>
                </section>

                <section className="questions">
                    <h2 className="h2-title">le domande frequenti</h2>
                    <div className="accordion" id="accordionExample">
                        <Accordion id={1} title={"Domanda 1"} answer={"risposta 1"} />
                        <Accordion id={2} title={"Domanda 2"} answer={"risposta 2"} />
                        <Accordion id={3} title={"Domanda 3"} answer={"risposta 3"} />
                        <Accordion id={4} title={"Domanda 4"} answer={"risposta 4"} />
                    </div>
                </section>
            </>
    );
    }
    }