import React, {Component, PropTypes} from 'react';

export default class TeacherCard extends Component {

    render(){
        return(
            <>

                <div className="card" style={{width: '15rem', textAlign: 'center', margin: '10px'}}>
                    <img src="..." className="card-img" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Nome insegnante</h5>
                        <p className="card-text">Descrizione</p>
                        <div className="reviews"></div>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </>
        );
    }

}