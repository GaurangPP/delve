import React, { useState } from 'react';
import './Landing.css';
import { JournalCard } from './JournalCard';

const initialEvents = [];

export const Landing = () => {
    const [input, setInput] = useState('');
    const [events, setEvents] = useState(initialEvents);
    const [filteredEvents, setFilteredEvents] = useState(initialEvents);
    const [showModal, setShowModal] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');

    const handleChange = (value) => {
        setInput(value);
        setFilteredEvents(
            events.filter((event) =>
                `${event.event.toLowerCase()} ${event.date.toLowerCase()} ${event.month.toLowerCase()}`
                    .includes(value.toLowerCase())
            )
        );
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const createNewEntry = () => {
        if (newEventTitle.trim() === '') return;

        const today = new Date();
        const newEvent = {
            month: today.toLocaleString('default', { month: 'long' }),
            date: String(today.getDate()),
            event: newEventTitle,
        };

        const updatedEvents = [newEvent, ...events];
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
        setNewEventTitle('');
        closeModal();
    };

    return (
        <div className='landing-container'>
            <header className='header'>
                <h2 className='greeting'>Good afternoon, Sadie!</h2>
                <div className='search-container'>
                    {/* Image for the left of the search bar */}
                    <img src='moodboard_logo.jpg' alt="Moodboard Logo" className="search-image" />
                    <div className='search-bar'>
                        <i className='fas fa-search'></i>
                        <input
                            type='text'
                            value={input}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <button className='add-button' onClick={openModal}>+</button>
                </div>
            </header>

            <div className='journal-list'>
                {filteredEvents.map((event, index) => (
                    <JournalCard
                        key={index}
                        month={event.month}
                        date={event.date}
                        event={event.event}
                    />
                ))}
            </div>

            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h3>New Journal Entry</h3>
                        <input
                            type='text'
                            placeholder='Enter a title for your journal...'
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                        />
                        <div className='modal-buttons'>
                            <button onClick={createNewEntry}>Create</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
