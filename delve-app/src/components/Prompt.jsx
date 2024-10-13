import React, { useState, useRef } from 'react';
import './Prompt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

export const Prompt = ({ question, onDelete, onRefresh, prompts }) => {
  const [subPrompts, setSubPrompts] = useState([]); // State to hold nested prompts
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };


  const addSubPrompt = () => {
    // Add a new subprompt with a default question
    setSubPrompts([...subPrompts, { question: 'New Sub Prompt' }]);
  };

  const handleDelete = () => {
    // Delete this prompt and all sub-prompts
    onDelete();
  };

  const handleRefresh = () => {
    // Refresh this prompt and all sub-prompts
    onRefresh();
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const refreshSubPrompts = () => {
    setSubPrompts(subPrompts.map(() => ({ question: 'New Sub Prompt' })));
  };

  const deleteSubPrompt = (index) => {
    const updatedSubPrompts = subPrompts.filter((_, i) => i !== index);
    setSubPrompts(updatedSubPrompts);
  };

  return (
    <div className="prompt-container">
      <div className="prompt-header">
        {/* Triangle Arrow for dropdown */}
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          {isDropdownOpen ? '▼' : '▶'}
        </button>

        <div className="prompt-question">
          {question}
        </div>

        <div className="prompt-icons">
          <button className="icon-button" onClick={handleRefresh}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button className="icon-button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>

      {/* Dropdown content and nested prompts */}
      {isDropdownOpen && (
        <div className="prompt-dropdown">
          <div className="notepad-container">
            <textarea
                ref={textareaRef}
                className="notepad-textarea"
                value={text}
                onChange={handleTextChange}
                placeholder="Hey Sadie, what's on your mind?"
            />
            </div>
          
          {/* Add nested sub-prompts here */}
          {subPrompts.map((subPrompt, index) => (
            <Prompt
              key={index}
              question={subPrompt.question}
              onDelete={() => deleteSubPrompt(index)}
              onRefresh={refreshSubPrompts}
            />
          ))}

          {/* Button to add a nested prompt */}
          <button className="add-sub-prompt" onClick={addSubPrompt}>
            Add Sub Prompt
          </button>
        </div>
      )}
    </div>
  );
};