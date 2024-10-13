import React, { useState, useRef } from 'react';
import './Prompt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid'; // Use uuid for unique IDs
import { BOT_MESSAGE } from './Constants';
import TypingText from './TypingText';

export const Prompt = ({ id, question, onDelete, onRefresh, updatePrompt, onTextChange }) => {
  const [subPrompts, setSubPrompts] = useState([]); // State to hold nested prompts
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Keep dropdown open initially

  const [pastMessages, setPastMessages] = useState([]);

  const [loading, setLoading] = useState(true);

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

  const generateOptions = () => {
    let do_not_questions = "";
    if (pastMessages.length > 0) {
        do_not_questions = "Try not to use the following prompts, only use if necessary: ";
    }
    for (let i = 0; i < pastMessages.length; i++) {
        do_not_questions += pastMessages[i] + " ";
    }


    const options = {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PERPLEXITY_API_KEY}`, // Access the API key from .env
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        model: "llama-3.1-sonar-large-128k-chat",
        messages: [
            { role: "system", content: `${BOT_MESSAGE} ${do_not_questions}` },
            { role: "user", content: `${text}` }
        ],
        max_tokens: 100,
        temperature: 0.5,
        top_p: 0.9,
        return_citations: true,
        search_domain_filter: ["perplexity.ai"],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month",
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1
        })
    };
    return options;
    }

  // Add a new sub-prompt
  const addSubPrompt = async () => {
    try {
        setLoading(false);
        const response = await fetch('https://api.perplexity.ai/chat/completions', generateOptions()); // Wait for the fetch to complete
        const data = await response.json(); // Wait for the response to be parsed as JSON
        console.log(data); // Log the response data
        const newSubPrompt = { id: uuidv4(), question: `${data.choices[0].message.content}`, textareaData: '', children: [] };
        setSubPrompts([...subPrompts, newSubPrompt]);
        setPastMessages([...pastMessages, data.choices[0].message.content])
        updatePrompt(id, {
            question,
            textareaData: text,
            children: [...subPrompts, newSubPrompt],
        });
        setLoading(true);
    }
    catch (err) {
        console.error('Error fetching completion:', err); // Log any errors
      }
  };

  // Handle delete prompt
  const handleDelete = () => {
    // Delete this prompt and all sub-prompts
    onDelete(id);
  };

  // Handle refresh prompt and all sub-prompts
  const handleRefresh = async () => {
    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', generateOptions()); // Wait for the fetch to complete
        const data = await response.json(); // Wait for the response to be parsed as JSON
        console.log(data); // Log the response data

        setText('');
        setSubPrompts(subPrompts.map((sp) => ({ ...sp, question: `${data.choices[0].message.content}`, textareaData: '' })));
        setPastMessages([...pastMessages, data.choices[0].message.content])
        onRefresh(id);
    } catch (err) {
        console.error('Error fetching completion:', err); // Log any errors
    }
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
          {loading ? (<button className="sub-delve-button" onClick={addSubPrompt}></button>) : (<button className="sub-loading-button"></button>)}
        </div>
      )}
    </div>
  );
};