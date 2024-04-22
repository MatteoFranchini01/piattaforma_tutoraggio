import React from "react";
import homeCss from "../../css/home.css"
import Card from "../mainLayout/template/card"

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="main-container">
                <div className="presentation">
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
                        <p style={{textAlign: "center"}}>logo</p>
                    </div>
                </div>
                <div className="varie">

                </div>
                <div className="cards">
                    <h2 className="subject-title">le materie richieste</h2>
                    <div className="layout-cards">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>

                    </div>
                </div>
            </div>
        );
    }
}