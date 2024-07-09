import {Component} from "react";

class Card extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='col' style={{margin:'10px'}}>
                <div className="card" style={{width: '15rem', textAlign: 'center', margin: '10px'}}>
                    <div className="card-body">
                        <h5 className="card-title" style={{margin: 0}}>{this.props.name}</h5>
                        <p className="card-text" style={{paddingTop: '20px', margin: 0}}>Da €{this.props.price}</p>
                        <a href="#" className="btn btn-primary">Cerca insegnanti</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;