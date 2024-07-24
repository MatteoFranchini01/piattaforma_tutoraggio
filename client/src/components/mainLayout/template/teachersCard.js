import React, {Component} from "react";
import testImg from "./1.jpg"
import {Link} from "react-router-dom";

//TODO devo passare informazioni sull'insegnante
export default class TeachersCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <div className="external-card" style={{alignItems: 'center', width: '15em', position: 'relative', margin: '5%'}}>
                    <img src={testImg} className="card-img" alt="..."
                           style={{borderRadius: "50%", height: "125px", width: "125px", position: 'absolute', top: '-75px', left: '50%', transform: 'translateX(-40%)', zIndex: '1'}}/>
                    <div className="card" style={{width: "15em", margin: '0', paddingTop: '80px', paddingBottom: '15px'}}>
                        <div className="card-body" style={{textAlign: 'center'}}>
                            <h6 className="card-title" style={{textAlign: "center"}}>{this.props.teacherName}</h6>
                            <p className="card-text" style={{textAlign: "center"}}>{this.props.subjectName}</p>
                            <p className="card-text"> </p>
                            <Link to={`/tutor/${this.props.id}`}><a className="btn btn-primary">Visita
                                profilo</a></Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}