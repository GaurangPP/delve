import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './JournalEntry.css';
import { Prompt } from './Prompt';

export const JournalEntry = () => {
  const { title } = useParams(); // Get the journal title from route params

  const [prompts, setPrompts] = useState([
    { id: 1, question: "What's your favorite color?" },
    { id: 2, question: "What did you do today?" },
    { id: 3, question: "What's your next goal?" },
  ]);

  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleTextChange = (e) => setText(e.target.value);

  const handleRefresh = (id) => {
    setPrompts((prevPrompts) =>
      prevPrompts.map((prompt) =>
        prompt.id === id ? { ...prompt, question: 'New question' } : prompt
      )
    );
  };

  const handleDelete = (id) => {
    setPrompts((prevPrompts) => prevPrompts.filter((prompt) => prompt.id !== id));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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
        <h1 className="journal-title">{title}</h1> {/* Display the journal title */}
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
        {prompts.map((prompt) => (
          <Prompt
            key={prompt.id}
            question={prompt.question}
            onDelete={() => handleDelete(prompt.id)}
            onRefresh={() => handleRefresh(prompt.id)}
          />
        ))}
      </div>
      <button className="delve-button"></button>
    </div>
  );
};

export default JournalEntry;
