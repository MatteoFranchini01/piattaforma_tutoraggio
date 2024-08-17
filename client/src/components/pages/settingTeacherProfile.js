import {useEffect, useState} from 'react';
import "../../css/settingTeacherProfile.css"
import React from "react";
import img from "../../images/teacher_logo.png"
import SelectDaysTable from "../mainLayout/template/SelectDaysTable";
import {useNavigate, useParams} from "react-router-dom";

import imgteach1 from "../../images/Avatars/1.jpg"
import imgteach2 from "../../images/Avatars/2.jpg"
import imgteach3 from "../../images/Avatars/3.jpg"
import imgteach4 from "../../images/Avatars/4.jpg"
//import imgteach5 from "../../images/Avatars/5.jpg"
import imgteach6 from "../../images/Avatars/6.jpg"
import imgteach7 from "../../images/Avatars/7.jpg"
import imgteach8 from "../../images/Avatars/8.jpg"
import imgteach9 from "../../images/Avatars/9.jpg"
import imgteach10 from "../../images/Avatars/10.jpg"


export default function SettingTeacherProfile() {
    const {username} = useParams();
    const [validUsername, setValidUsername] = useState(false)
    const [id, setId] = useState("-1")

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const navigate = useNavigate();

    let selectedDays = []

    const [arrayLang, setArrayLang] = React.useState([]);
    const [arrayCompetences, setArrayCompetences] = React.useState([]);
    const [arraySubjects, setArraySubjects] = React.useState([]);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    // id della competenza
    const [selectedCompetence, setSelectedCompetence] = useState("-1");
    // id della lingua
    const [selectedLanguage, setSelectedLanguage] = useState("-1");
    // id della prima materia e rispettivo prezzo
    const [selectedSubjectOne, setSelectedSubjectOne] = useState("-1");
    const [priceOne, setPriceOne] = useState("");
    // id della seconda materia e rispettivo prezzo
    const [selectedSubjectTwo, setSelectedSubjectTwo] = useState("-1");
    const [priceTwo, setPriceTwo] = useState("");
    // id della terza materia e rispettivo prezzo
    const [selectedSubjectThree, setSelectedSubjectThree] = useState("-1");
    const [priceThree, setPriceThree] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedImage(event.target.value);
    };

    useEffect(() => {
        getSubjects()
        getLanguages()
        getCompetences()
        checkUsername()
    }, []);

    useEffect(() => {
        if (!isChecked1) {
            setSelectedSubjectTwo("-1");
            setPriceTwo("0")
        }
    }, [isChecked1]);

    useEffect(() => {
        if (!isChecked2) {
            setSelectedSubjectThree("-1");
            setPriceThree("0")
        }
    }, [isChecked2]);

    function checkUsername(){
        fetch(`http://localhost:3000/find_id/${username}`)
            .then(response => response.json())
            .then(data => {
                if(data.id !== -1){
                    setValidUsername(true)
                    setId(data.id);
                }
                else
                    setValidUsername(false)

            })
            .catch(error => console.log(error))
    }

    const handleSelectedDaysChange = (selectedCells) =>{
        selectedDays = selectedCells;
        console.log(selectedDays);
    }

    const handleCheckboxChangeTwo = (event) => {
        setIsChecked1(event.target.checked);
    };

    const handleCheckboxChangeThree = (event) => {
        setIsChecked2(event.target.checked);
    };

    function getLanguages() {
        const url = `http://localhost:3000/languages`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    id_lingua: item.id,
                    nome_lingua: item.nome,
                }));
                setArrayLang(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    function getCompetences() {
        const url = `http://localhost:3000/competences`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    id_istruzione: item.id,
                    livello_istruzione: item.nome,
                }));
                setArrayCompetences(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    function getSubjects() {
        const url = `http://localhost:3000/subjects`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.map(item => ({
                    id_materia: item.id,
                    nome_materia: item.nome,
                }));
                setArraySubjects(temp);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    function add_availability(id_tutor, selectedDays) {
        const tutor_add_ava = {
            id_tutor: id_tutor,
            selectedDays: selectedDays
        };
        fetch('http://localhost:3000/change_availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutor_add_ava),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error))
    }

    function add_bio(id_tutor, bio) {
        const tutor_to_add = {
            id_tutor: id_tutor,
            bio: bio
        };
        fetch('http://localhost:3000/add_bio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutor_to_add),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    function add_tutor_materia(id_tutor, id_materia, prezzo) {
        const tutor_to_add = {id_tutor, id_materia, prezzo};
        fetch('http://localhost:3000/add_tutor_materia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutor_to_add),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    function add_compLing(id_tutor, id_comp) {
        const tutor_compLing = {id_comp, id_tutor};
        fetch('http://localhost:3000/add_compLing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutor_compLing),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    function add_istr(id_tutor, id_istr) {
        const tutor_istr = {id_tutor, id_istr};
        fetch('http://localhost:3000/add_istr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutor_istr),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    function add_path_photo(id){
        if(selectedImage){
            const tutor_info = {
                id_tutor: id,
                photo: selectedImage
            };
            fetch('http://localhost:3000/add_photo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tutor_info),
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
        }
    }

    const handleSubmit = () =>{

        if(validUsername && selectedCompetence !== "-1" && selectedLanguage !== "-1" && selectedSubjectOne !== "-1" && priceOne){

            if(description.length === 0){
                setDescriptionError("Non hai inserito una breve descrizione di te stesso! ")
            }
            else{
                // qui sono validi username, livello di istruzione, prima materia e lingua
                setDescriptionError("")

                // qui posso andare a inserire tutti i parametri precedenti
                add_tutor_materia(id, parseInt(selectedSubjectOne), parseInt(priceOne));
                add_compLing(id, parseInt(selectedLanguage));
                add_istr(id, parseInt(selectedCompetence));
                add_bio(id, description);
                add_availability(id, selectedDays);

                add_path_photo(id)

                if(selectedSubjectTwo !== "-1" && priceTwo)
                {
                    console.log("Seconda materia " + selectedSubjectTwo + ", prezzo: " + priceTwo);
                    // qui posso inserire la seconda materia
                    add_tutor_materia(id, parseInt(selectedSubjectTwo), parseInt(priceTwo));

                    if(selectedSubjectThree !== "-1"){
                        console.log("Terza materia " + selectedSubjectThree + ", prezzo: " + priceThree);
                        //qui posso inserire la terza materia
                        add_tutor_materia(id, parseInt(selectedSubjectThree), parseInt(priceThree));

                    }
                }

                navigate("/registrationConfirmed")
            }
        }
        else{
            console.log("Non tutti i campi sono stati compilati.")
        }
    }

    return(
        <>
            <div className="settings">
                <div className="settings-border">
                    {
                        validUsername ?
                            <>
                                <h3 className="settings-h3">Compila il form per completare la registrazione!</h3>
                                <div className="box form-settings">
                                    <div className="section section1">
                                        <p className="paragraph-label">Quale materia desideri insegnare?</p>
                                        <div className="minibox inline-select">
                                            <select className="form-select sub"
                                                    aria-label="Default select example"
                                                    value={selectedSubjectOne}
                                                    onChange={(e) => setSelectedSubjectOne(e.target.value)}>
                                                <option value="-1" disabled>
                                                    Seleziona una materia
                                                </option>
                                                {arraySubjects.map((sub) => (
                                                    <option key={sub.id_materia} value={sub.id_materia}>
                                                        {sub.nome_materia}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="minibox inline-text">
                                            <input className="form-control price-text-area" type="number"
                                                   placeholder="Prezzo"
                                                   aria-label="default input example"
                                                   value={priceOne}
                                                   onChange={(e) => setPriceOne(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkbox1"
                                        checked={isChecked1}
                                        onChange={handleCheckboxChangeTwo}
                                        style={{marginTop: '25px'}}
                                    />
                                    <label className="form-check-label sub-label" htmlFor="checkbox1">
                                        Vuoi insegnare una seconda materia?
                                    </label>
                                    <div className="section section2">
                                        <div className="minibox inline-select">
                                            <select className="form-select sub"
                                                    value={selectedSubjectTwo}
                                                    disabled={!isChecked1}
                                                    onChange={(e) => setSelectedSubjectTwo(e.target.value)}>
                                                <option value="-1" disabled>
                                                    Seleziona una materia
                                                </option>
                                                {arraySubjects.map((sub) => (
                                                    <option key={sub.id_materia} value={sub.id_materia}>
                                                        {sub.nome_materia}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="minibox inline-text">
                                            <input className="form-control price-text-area" type="number"
                                                   placeholder="Prezzo"
                                                   value={priceTwo}
                                                   disabled={!isChecked1}
                                                   onChange={(e) => setPriceTwo(e.target.value)}
                                            />
                                        </div>

                                    </div>


                                    {
                                        isChecked1 ?
                                            <>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="checkbox2"
                                                    checked={isChecked2}
                                                    onChange={handleCheckboxChangeThree}
                                                    style={{marginTop: '25px'}}
                                                />
                                                <label className="form-check-label sub-label-2" htmlFor="checkbox2">
                                                    Vuoi insegnare una terza materia?
                                                </label>
                                                <div className="section section3">
                                                    <div className="minibox inline-select">
                                                        <select
                                                            className="form-select sub3"
                                                            value={selectedSubjectThree}
                                                            disabled={!isChecked2}
                                                            onChange={(e) => setSelectedSubjectThree(e.target.value)}
                                                        >
                                                            <option value="-1" disabled>
                                                                Seleziona una materia
                                                            </option>
                                                            {arraySubjects.map((sub) => (
                                                                <option key={sub.id_materia} value={sub.id_materia}>
                                                                    {sub.nome_materia}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="minibox inline-text">
                                                        <input className="form-control price-text-area" type="number"
                                                               placeholder="Prezzo"
                                                               aria-label="default input example"
                                                               value={priceThree}
                                                               disabled={!isChecked2}
                                                               onChange={(e) => setPriceThree(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                            : null
                                    }

                                    <p className="paragraph-label">Seleziona il tuo livello di istruzione:</p>
                                    <select className="form-select languages"
                                            aria-label="Default select example"
                                            value={selectedCompetence}
                                            onChange={(e) => setSelectedCompetence(e.target.value)}>
                                        <option value="-1" disabled>
                                        Seleziona il livello
                                        </option>
                                        {arrayCompetences.map((is) => (
                                            <option key={is.id_istruzione} value={is.id_istruzione}>
                                                {is.livello_istruzione}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="paragraph-label"> Seleziona la lingua che padroneggi meglio e nella
                                        quale intendi
                                        fare lezione:</p>
                                    <select
                                        className="form-select languages"
                                        aria-label="Default select example"
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}>
                                        <option value="-1" disabled>
                                            Seleziona una lingua
                                        </option>
                                        {arrayLang.map((lang) => (
                                            <option key={lang.id_lingua} value={lang.id_lingua}>
                                                {lang.nome_lingua}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="paragraph-label">Scegli una foto, la imposteremo come immagine
                                        del
                                        profilo!</p>

                                    <div className="input-group select-image" style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/foto1.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach1} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/2.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach2} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/3.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach3} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                    </div>

                                    <div className="input-group select-image" style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/4.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach4} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/6.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach6} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/7.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach7} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                    </div>

                                    <div className="input-group select-image" style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/8.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach8} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/9.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach9} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                        <div className="img-select-img" style={{display: 'flex', alignItems: 'center'}}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="../../images/Avatars/10.jpg"
                                                onChange={handleRadioChange}
                                            />
                                            <img src={imgteach10} className="img-thumbnail" alt="foto 1"
                                                 style={{height: '100px', width: '100px', marginLeft: '10px'}}/>
                                        </div>
                                    </div>


                                    <p className="paragraph-label">Includi una breve descrizione di te o qualunque cosa
                                        possa
                                        aiutare i tuoi futuri studenti!</p>
                                    <textarea
                                        className="form-control text-area"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={description}
                                        maxLength="500"
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    {descriptionError && <p className="error-paragraph-bio">{descriptionError}</p>}

                                    <p className="paragraph-label">
                                        Seleziona giorni e orari disponibili (puoi modificarli successivamente nel
                                        centro di
                                        gestione account):
                                    </p>
                                    <SelectDaysTable onSelectedDaysChange={handleSelectedDaysChange}/>
                                </div>
                                <div className="box image-subscribe-box">
                                    <img className="sub-img" src={img} alt="subscribe img"/>
                                </div>

                                <div className="divWithBtn">
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Iscriviti
                                    </button>
                                </div>
                            </>
                        :
                            <>
                                <div className="error-div">
                                    <h3 className="settings-h3">Username non trovato: non è possibile completare la
                                        registrazione!</h3>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    );
}