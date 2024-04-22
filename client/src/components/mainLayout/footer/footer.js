import React from "react";
export default class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                <footer
                    className="text-center text-lg-start text-dark"
                    style={{backgroundColor: "#ECEFF1"}}
                >
                <section className="" style={{backgroundColor: "#ECEFF1"}}>
                    <div className="container text-center text-md-start">
                        <div className="row pt-4">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Piattaforma tutoraggio</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width:" 60px", backgroundColor: "#7c4dff", height: "2px"}}
                                />
                                <p>
                                    Descrizione.<br/>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Products</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width:" 60px", backgroundColor: "#7c4dff", height: "2px"}}
                                />
                                <p>
                                    <a href="#!" className="text-dark">Link1</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Link2</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Link3</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Link4</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Link utili</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width:" 60px", backgroundColor: "#7c4dff", height: "2px"}}
                                />
                                <p>
                                    <a href="#!" className="text-dark">Il tuo account</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Diventare insegnate</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Il nostro obiettivo</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Prezzi</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold">Contatti</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                                />
                                <p><i className="fas fa-home mr-3"></i> Parma, Italia</p>
                                <p><i className="fas fa-envelope mr-3"></i> info@mails.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 39 333 748 1384 </p>
                                <p><i className="fas fa-print mr-3"></i> + 39 335 213 3249 </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div
                    className="text-center p-3"
                    style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                >
                    © 2024 Copyright
                </div>
                </footer>
        );
    }
}