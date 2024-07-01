import {Component} from "react";
import testImg from "./1.jpg"

//TODO devo passare informazioni sull'insegnante
export default class TeachersCard extends Component {

    render() {
        return(
            <>
                <div className="external-card" style={{alignItems: 'center', width: '15em', position: 'relative', margin: '5%'}}>
                    <img src={testImg} className="card-img" alt="..."
                           style={{borderRadius: "50%", height: "150px", width: "150px", position: 'absolute', top: '-75px', left: '50%', transform: 'translateX(-50%)', zIndex: '1'}}/>
                    <div className="card" style={{width: "15em", margin: '0', paddingTop: '80px', paddingBottom: '15px'}}>
                        <div className="card-body">
                            <h6 className="card-title" style={{textAlign: "center"}}>Nome insegnante</h6>
                            <p className="card-text" style={{textAlign: "center"}}>materia</p>
                            <p className="card-text">prezzo <br/>stelline </p>
                            {/*TODO questo link dovrà puntare a tutor.js*/}
                            {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}