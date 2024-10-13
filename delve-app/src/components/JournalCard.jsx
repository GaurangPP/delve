import React from 'react'
import './JournalCard.css'

export const JournalCard = ({ month, date, event, onClick }) => {
    return (
    <button className="card" onClick={onClick}>
      <div className="date">
        <span className="month">{month.substring(0,3)}</span>
        <span className="day">{date}</span>
      </div>
      <div className='separator' /> {/* Vertical line */}
      <div className="title"> {event} </div>
    </button>
      );
}
