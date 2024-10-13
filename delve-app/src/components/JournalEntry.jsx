import React, { useState, useRef, useEffect } from 'react';
import './JournalEntry.css';

export const JournalEntry = () => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Adjust the height of the textarea dynamically based on the content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto to shrink if necessary
      //Switch above to auto otherwise
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to fit content
    }
  }, [text]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="journal-container">
  <div className="journal-content">
    <h1 className="journal-title">My Day at Dubhacks</h1>
    <p className="journal-date">{today}</p>
    <div className="notepad-container">
      <textarea
        ref={textareaRef}
        className="notepad-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Hey Sadie, what's on your mind?"
      />
    </div>
    <button class="delve-button"></button>
  </div>
</div>
  );
};

export default JournalEntry;
