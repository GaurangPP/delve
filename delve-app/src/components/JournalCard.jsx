import React from 'react';
import './JournalCard.css';
import { useNavigate } from 'react-router-dom';

export const JournalCard = ({ month, date, event }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleClick = () => {
        navigate(`/journal/${event}`); // Navigate to the corresponding journal entry page
    };

    return (
        <button className="card" onClick={handleClick}>
            <div className="date">
                <span className="month">{month.substring(0, 3)}</span>
                <span className="day">{date}</span>
            </div>
            <div className="separator" /> {/* Vertical line */}
            <div className="title"> {event} </div>
        </button>
    );
};
