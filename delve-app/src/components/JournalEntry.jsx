import React, { useState, useRef, useEffect } from 'react';
import './JournalEntry.css';
import { Prompt } from './Prompt';

export const JournalEntry = () => {

    const [prompts, setPrompts] = useState([
        { id: 1, question: "What's your favorite color?" },
        { id: 2, question: "What did you do today?" },
        { id: 3, question: "What's your next goal?" },
      ]);


  const [text, setText] = useState('');
  const textareaRef = useRef(null);


  const handleTextChange = (e) => {
    setText(e.target.value);
  };

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
    {prompts.map((prompt) => (
        <Prompt
          key={prompt.id}
          question={prompt.question}
          onDelete={() => handleDelete(prompt.id)}  // Passing the delete handler
          onRefresh={() => handleRefresh(prompt.id)} // Passing the refresh handler
          prompts={[{ id: 1, question: "What's your favorite color?" },]}
        />
    ))}
  </div>
  <button class="delve-button"></button>
</div>
  );
};

export default JournalEntry;
