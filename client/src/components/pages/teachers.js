import React, {useEffect, useState} from "react";
import "../../css/teachers.css";
import TeachersCard from "../mainLayout/template/teachersCard";

export default function Teachers({subject_name}) {
    const [numberOfTeachers, setNumberOfTeachers] = useState(6);
    const [componentsArray, setComponentsArray] = useState([]);
    const [price, setPrice] = useState(50);
    const [subjectSelected, setSubjectSelected] = useState("Materia selezionata");
    const [array_tutor, setArrayTutor] = React.useState([]);

    useEffect(() => {
        const componentsArray = Array.from({ length: numberOfTeachers }, (_, i) => i);
        setComponentsArray(componentsArray);
    }, [numberOfTeachers]);

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    React.useEffect(() => {
        getTutorPerMateria(subject_name);
    }, [subject_name]);

    function getTutorPerMateria(subject_name) {
        const url = `/teachers/${subject_name}/tutor`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    rating: item.rating,
                    id_tutor: item.id,
                    tutor_nome: item.nome,
                    tutor_cognome: item.cognome,
                }));
                setArrayTutor(temp);
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
                    {componentsArray.map((index) => (
                        <TeachersCard key={index} id={"teacher_id"} teacherName={"test_nome"} subjectName={"nome_materia"} rating={"rating_stelline"} />
                    ))}
                </div>
            </div>
        </>
    );
}