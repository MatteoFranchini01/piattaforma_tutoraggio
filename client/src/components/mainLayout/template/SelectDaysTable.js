import React, {useCallback, useState} from "react";

function SelectDaysTable({ onSelectedDaysChange }) {
    const [selectedDays, setSelectedDays] = useState([]); // Use useState to store the selected days

    const days = ['lun', 'mar', 'mer', 'gio', 'ven'];
    const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    function getCellClass(time, day) {
        if (selectedDays.some((item) => item.time === time && item.day === day)) {
            return {
                style: { backgroundColor: '#34c6eb' },
            };
        } else {
            return {
                style: { backgroundColor: 'transparent' },
            };
        }
    }

    const handleCellClick = useCallback((time, day) => {
        const cell = { time, day };
        setSelectedDays((prevSelectedCells) => {
            if (prevSelectedCells.some((cellInArray) => cellInArray.time === time && cellInArray.day === day)) {
                const updatedCells = prevSelectedCells.filter((cellInArray) => cellInArray.time!== time || cellInArray.day!== day);
                onSelectedDaysChange(updatedCells); // Call the callback function with the updated state
                return updatedCells;
            } else {
                const updatedCells = [...prevSelectedCells, cell];
                onSelectedDaysChange(updatedCells); // Call the callback function with the updated state
                return updatedCells;
            }
        });
    }, [onSelectedDaysChange]);

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
                        const { style } = getCellClass(time, day);
                        return (
                            <td
                                key={dayIndex}
                                style={style}
                                onClick={() => handleCellClick(time, day)}
                            >
                                <a href="#" style={{ display: "block", width: "100%", height: "100%" }}></a>
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default SelectDaysTable;