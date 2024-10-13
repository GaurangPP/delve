import React, { useState, useRef } from 'react';
import './Prompt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid'; // Use uuid for unique IDs

export const Prompt = ({ id, question, onDelete, onRefresh, updatePrompt, onTextChange }) => {
  const [subPrompts, setSubPrompts] = useState([]); // State to hold nested prompts
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Keep dropdown open initially
  

  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Handle text change in the textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
    // Update the parent with the current prompt's data
    updatePrompt(id, {
      question,
      textareaData: e.target.value,
      children: subPrompts,
    });
    //onTextChange();
  };

  // Add a new sub-prompt
  const addSubPrompt = () => {
    const newSubPrompt = { id: uuidv4(), question: 'New Sub Prompt', textareaData: '', children: [] };
    setSubPrompts([...subPrompts, newSubPrompt]);
    updatePrompt(id, {
      question,
      textareaData: text,
      children: [...subPrompts, newSubPrompt],
    });
  };

  // Handle delete prompt
  const handleDelete = () => {
    // Delete this prompt and all sub-prompts
    onDelete(id);
  };

  // Handle refresh prompt and all sub-prompts
  const handleRefresh = () => {
    setText('');
    setSubPrompts(subPrompts.map((sp) => ({ ...sp, question: 'New Sub Prompt', textareaData: '' })));
    onRefresh(id);
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Delete a sub-prompt using its unique ID
  const deleteSubPrompt = (subPromptId) => {
    const updatedSubPrompts = subPrompts.filter((sp) => sp.id !== subPromptId);
    setSubPrompts(updatedSubPrompts);
    updatePrompt(id, {
      question,
      textareaData: text,
      children: updatedSubPrompts,
    });
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
              placeholder="Delve into it..."
            />
          </div>

          {/* Nested sub-prompts */}
          {subPrompts.map((subPrompt) => (
            <Prompt
              key={subPrompt.id}
              id={subPrompt.id}
              question={subPrompt.question}
              onDelete={deleteSubPrompt}
              onRefresh={handleRefresh}
              updatePrompt={(subPromptId, updatedSubPrompt) => {
                const updatedSubPrompts = subPrompts.map((sp) =>
                  sp.id === subPromptId ? {subPromptId, ...updatedSubPrompt} : sp
                );
                setSubPrompts(updatedSubPrompts);
                updatePrompt(id, {
                  question,
                  textareaData: text,
                  children: updatedSubPrompts,
                });
              }}
            />
          ))}

          {/* Button to add a sub-prompt */}
          <button className="add-sub-prompt" onClick={addSubPrompt}>
            Add Sub Prompt
          </button>
        </div>
      )}
    </div>
  );
};