import React from 'react';
import './Landing.css';
import { JournalCard } from './JournalCard';
import { useState } from 'react';

const events = [
    { month: 'October', date: '12', event: 'DubHacks!' },
    { month: 'October', date: '13', event: 'CodeFest' },
    { month: 'October', date: '14', event: 'Hackathon' },
    { month: 'October', date: '15', event: 'Meetup' },
    { month: 'October', date: '17', event: 'UMM'},
];


export const Landing = () => {

  const [input, setInput] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(events);


  const handleChange = (value) => {
    console.log(value)
        setInput(value);
        if (value === "") {
            setFilteredEvents(events);
          } else {
        setFilteredEvents(events.filter((event) => {
        const result =  event.event.toLowerCase() + " " + event.date.toLowerCase() + " " + event.month.toLowerCase();
        const searchTermChars = value.toLowerCase().split('');
        //console.log(result)
        return searchTermChars.every((char) => result.includes(char));
        //return result.includes(value.toLowerCase());
      }))};
  }

  return (
    <div className='landing-container'>
      <header className='header'>
        <h2 className='greeting'>Good afternoon, Sadie!</h2>
        <div className='search-container'>
            <div className='search-bar'>
                <i className='fas fa-search'></i>
                <input type='text' value={input} onChange={(e) => handleChange(e.target.value)}/>
            </div>
            <button className='add-button'>+</button>
        </div>
      </header>
      
      <div className="journal-list">
        {filteredEvents.map((event, index) => (
          <JournalCard key={index} month = {event.month} date={event.date} event={event.event} />
        ))}
      </div>
      </div>
  );
};


