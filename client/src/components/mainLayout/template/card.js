import {Component} from "react";

class Card extends Component{
    render(){
        return(
            <div className='col' style={{margin:'10px'}}>
                <div className="card" style={{width: '15rem', textAlign: 'center'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.nome}</h5>
                        <p className="card-text">Da €{this.props.prezzo}</p>
                        <a href="#" className="btn btn-primary">Cerca insegnanti</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;