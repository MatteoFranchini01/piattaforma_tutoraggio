import React, {useState} from "react";

function Table({ schedule, bookedUp, onBookButtonClicked}) {

    const days = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
    const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];


    function getCellClass(time, day) {
        if (schedule.some((item) => item.time === time && item.day === day)) {
            if (bookedUp.some((item) => item.time === time && item.day === day)) {
                return {
                    className: 'available',
                    style: {backgroundColor: '#ff1a1a'},
                    children: <a href="#" style={{display: "block", width: "100%", height: "100%"}} ></a>
                }
            }
            else{
                return {
                    className: 'available',
                    style: {backgroundColor: '#A2F69A'},
                    children: <button className="bookButton"
                                      style={{display: "block", width: "100%", height: "100%"}}
                                      onClick={(e) => onBookButtonClicked(time, day)}>
                        Prenota</button>
                }
            }
        }
        else {
            return { className: '', style: { backgroundColor: 'transparent' } };
        }
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Orario</th>
                {days.map((day, index) => (
                    <th key={index}>{day.toUpperCase()}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {times.map((time, rowIndex) => (
                <tr key={rowIndex}>
                    <th scope="row">{time}</th>
                    {days.map((day, dayIndex) => {
                        const { className, style, children } = getCellClass(time, day);
                        return (
                            <td key={dayIndex} className={className} style={style}>
                                {children}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;