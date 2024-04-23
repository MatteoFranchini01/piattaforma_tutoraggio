import React from 'react';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={`#collapse${this.props.id}`} aria-expanded="false" aria-controls={`collapse${this.props.id}`}>
                        {this.props.title}
                    </button>
                </h2>
                <div id={`collapse${this.props.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {this.props.answer}
                    </div>
                </div>
            </div>
        );
    }
}

export default Accordion;