import React from 'react';
import './Landing.css';

export const Landing = () => {
  return (
    <div className='landing-container'>
      <header className='header'>
        <h2 className='greeting'>Good afternoon, Sadie!</h2>
        <div className='search-container'>
            <div className='search-bar'>
                <i className='fas fa-search'></i>
                <input type='text' />
            </div>
            <button className='add-button'>+</button>
        </div>
      </header>
      <div className='event-list'>
        <div className='event-item'>
          <span className='event-date'>9</span>
          <span className='event-name'>DubHacks!</span>
        </div>
        {/* Add more event items here */}
      </div>
    </div>
  );
};


