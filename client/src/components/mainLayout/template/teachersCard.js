import React, {Component} from "react";
import {Link} from "react-router-dom";

import imgteach1 from "../../../images/Avatars/1.jpg"
import imgteach2 from "../../../images/Avatars/2.jpg"
import imgteach3 from "../../../images/Avatars/3.jpg"
import imgteach4 from "../../../images/Avatars/4.jpg"
//import imgteach5 from "../../images/Avatars/5.jpg"
import imgteach6 from "../../../images/Avatars/6.jpg"
import imgteach7 from "../../../images/Avatars/7.jpg"
import imgteach8 from "../../../images/Avatars/8.jpg"
import imgteach9 from "../../../images/Avatars/9.jpg"
import imgteach10 from "../../../images/Avatars/10.jpg"

export default class TeachersCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <div className="external-card" style={{alignItems: 'center', width: '15em', position: 'relative', margin: '5%'}}>
                    <img src={this.props.foto === "../../images/Avatars/1.jpg" ? imgteach1 :
                        this.props.foto === "../../images/Avatars/2.jpg" ? imgteach2 :
                            this.props.foto === "../../images/Avatars/3.jpg" ? imgteach3 :
                                this.props.foto === "../../images/Avatars/4.jpg" ? imgteach4 :
                                    this.props.foto === "../../images/Avatars/6.jpg" ? imgteach6 :
                                        this.props.foto === "../../images/Avatars/7.jpg" ? imgteach7 :
                                            this.props.foto === "../../images/Avatars/8.jpg" ? imgteach8 :
                                                this.props.foto === "../../images/Avatars/9.jpg" ? imgteach9 :
                                                    this.props.foto === "../../images/Avatars/10.jpg" ? imgteach10 : null} className="card-img" alt="..."
                           style={{borderRadius: "50%", height: "125px", width: "125px", position: 'absolute', top: '-75px', left: '50%', transform: 'translateX(-40%)', zIndex: '1'}}/>
                    <div className="card" style={{width: "15em", margin: '0', paddingTop: '80px', paddingBottom: '15px'}}>
                        <div className="card-body" style={{textAlign: 'center'}}>
                            <h6 className="card-title" style={{textAlign: "center"}}>{this.props.teacherName}</h6>
                            <p className="card-text" style={{textAlign: "center"}}>{this.props.subjectName}</p>
                            <p className="card-text"> </p>
                            <Link className="btn btn-primary" to={`/teachers/${this.props.subjectName}/${this.props.id}` }>Visita
                                profilo</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}