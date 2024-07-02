import React from 'react';

class HowToStart extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="card m-lg-3" style={{width: "18rem", height: "20rem", zIndex:"0"}}>
                <div className="card-body">
                    <div className="numbers pt-3"> {this.props.number} </div>
                    <h5 className="card-title pt-3">{this.props.what}</h5>
                    <p className="card-text pt-3">{this.props.how}</p>
                </div>
            </div>
        );
    }

}

export default HowToStart;