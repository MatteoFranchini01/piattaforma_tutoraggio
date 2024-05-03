import React from 'react';

export default class CollapseParagraph extends React.Component {
    render() {
        return(
            <>
                <div className="collapse" id={`collapse${this.props.id}`} style={{paddingTop:'10px'}}>
                    <div className="card card-body">
                        {this.props.answer}
                    </div>
                </div>
            </>
        );
    }
}