import React from "react";
import TeachersCard from "../mainLayout/template/teacherCard";
import "../../css/teachers.css"

export default function Teachers() {
    // da passare in ingresso la materia, in modo da visualizzare gli insegnanti relativi a quella materia
    const numberOfComponents = 6;
    const componentsArray = Array.from({ length: numberOfComponents }, (_, i) => i);

    return (
        <>
            <div className="filters"></div>
            <div className="contents">
                <div className="row cards-teachers">
                    {/*{componentsArray.map((index) => (
                        <TeachersCard key={index}/>
                    ))}*/}
                    <TeachersCard/>
                </div>
            </div>
        </>

    );


}