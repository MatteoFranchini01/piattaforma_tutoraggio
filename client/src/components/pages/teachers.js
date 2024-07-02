import React, {useEffect, useState} from "react";
import "../../css/teachers.css";
import TeachersCard from "../mainLayout/template/teachersCard";

//TODO a questa funzione deve arrivare l'ID della materia, in modo da sapere quali sono e quanti sono gli insegnanti che fanno quella materia
export default function Teachers() {
    const [numberOfTeachers, setNumberOfTeachers] = useState(6);
    const [componentsArray, setComponentsArray] = useState([]);
    const [price, setPrice] = useState(50);

    var subjectSelected = "Materia Selezionata"

    useEffect(() => {
        const componentsArray = Array.from({ length: numberOfTeachers }, (_, i) => i);
        setComponentsArray(componentsArray);
    }, [numberOfTeachers]);

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    return (
        <>
            <div className="main-content">
                <div className="box teach-box filters">
                    <h3 className="title-teachers-filters">Personalizza la tua ricerca!</h3>

                    <input className="form-control" type="text" placeholder="Default input"
                           aria-label="default input example" readOnly value={subjectSelected}
                           onChange={handlePriceChange}/>

                    <select className="form-select levels">
                        <option selected>Scegli il livello</option>
                        <option value="tutti">Tutti i livelli</option>
                        <option value="elementari">Elementari</option>
                        <option value="medie">Scuola secondaria</option>
                        <option value="superiori">Scuola superiore</option>
                    </select>

                    <label htmlFor="customRange1" className="form-label">
                        Scegli il prezzo massimo: {price}.00€
                    </label>
                    <input
                        type="range"
                        className="form-range"
                        id="customRange1"
                        value={price}
                        onChange={handlePriceChange}
                    />

                    <button className="btn btn-primary find" type="submit">Cerca</button>
                </div>
                <div className="vr vr-teach"></div>
                <div className="box teach-box row teachers-information">
                    {componentsArray.map((index) => (
                        <TeachersCard key={index}/>
                    ))}
                </div>
            </div>
        </>
    );
}