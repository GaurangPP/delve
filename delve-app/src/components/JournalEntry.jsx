import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './JournalEntry.css';
import { Prompt } from './Prompt';
import { v4 as uuidv4 } from 'uuid'; // Unique IDs

export const JournalEntry = () => {
    
  const [prompts, setPrompts] = useState([]);
  const [currentPromptId, setCurrentPromptId] = useState(null);
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const updatePrompt = (id, updatedPrompt) => {
    const updatedPrompts = prompts.map((prompt) =>
      prompt.id === id ? {id, ...updatedPrompt} : prompt
    );
    setPrompts(updatedPrompts);
  };

  const addPrompt = () => {
    setPrompts([...prompts, { id: uuidv4(), question: 'New Prompt', textareaData: '', children: [] }]);
  };

  const deletePrompt = (id) => {
    const removePromptById = (promptsArray, targetId) => {
      return promptsArray
        .filter((prompt) => prompt.id !== targetId)
        .map((prompt) => ({
          ...prompt,
          children: removePromptById(prompt.children, targetId),
        }));
    };

    setPrompts(removePromptById(prompts, id));
  };

  const refreshPrompt = (id) => {
    setPrompts(
      prompts.map((prompt) =>
        prompt.id === id
          ? { ...prompt, question: 'New Prompt', textareaData: '', children: [] }
          : prompt
      )
    );
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    //setCurrentPromptId(id); // Set the current prompt ID
  };

  // Adjust the height of the textarea dynamically based on the content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto to shrink if necessary
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
            id={prompt.id}
            question={prompt.question}
            onDelete={deletePrompt}
            onRefresh={refreshPrompt}
            updatePrompt={updatePrompt}
          />
        ))}

        <button onClick={addPrompt}>Add Prompt</button>
      </div>
      <button className="delve-button" onClick={addPrompt}></button>
    </div>
  );
};

export default JournalEntry;