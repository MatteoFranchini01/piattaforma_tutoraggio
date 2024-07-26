import React, {useEffect, useState} from "react";
import "../../css/teachers.css";
import TeachersCard from "../mainLayout/template/teachersCard";
import {useParams} from "react-router-dom";

export default function Teachers() {
    const subject_name = useParams().subject_name;
    const [price, setPrice] = useState(50);
    const [subjectSelected, setSubjectSelected] = useState("Materia selezionata");
    const [arrayTutor, setArrayTutor] = React.useState([]);

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    useEffect(() => {
        setSubjectSelected(subject_name)
        getTutorPerMateria();
    }, [subject_name]);

    function getTutorPerMateria() {
        const url = `http://localhost:3000/teachers/${subject_name}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    //rating: item.rating,
                    tutor_id: item.id,
                    tutor_nome: item.nome,
                    tutor_cognome: item.cognome,
                }));
                setArrayTutor(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
        }


    return (
        <>
            <div className="main-content">
                <div className="box teach-box filters">
                    <h3 className="title-teachers-filters">Personalizza la tua ricerca!</h3>

                    <input className="form-control teachers-form-control" type="text" placeholder="Default input"
                           aria-label="default input example" readOnly value={subjectSelected}
                           />

                    <select className="form-select levels form-select-teacher">
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
                    {arrayTutor.map((teacher, index) => (
                        <TeachersCard key={index} id={teacher.tutor_id} teacherName={teacher.tutor_nome + teacher.tutor_cognome} subjectName={subject_name} rating={0} />
                    ))}
                </div>
            </div>
        </>
    );
}