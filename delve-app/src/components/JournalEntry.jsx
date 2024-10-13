import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './JournalEntry.css';
import { Prompt } from './Prompt';
import { v4 as uuidv4 } from 'uuid'; // Unique IDs
import { useNavigate } from 'react-router-dom';
import { BOT_MESSAGE } from './Constants';

export const JournalEntry = ({data}) => {

  const [prompts, setPrompts] = useState([]);
  const [currentPromptId, setCurrentPromptId] = useState(null);
  const [pastMessages, setPastMessages] = useState([]);
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  //console.log(process.env.REACT_APP_PERPLEXITY_API_KEY);

  const generateOptions = () => {
    let do_not_questions = "";
    if (pastMessages.length > 0) {
        do_not_questions = "Do not to use the following topics, only use if necessary: ";
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


  const updatePrompt = (id, updatedPrompt) => {
    const updatedPrompts = prompts.map((prompt) =>
      prompt.id === id ? {id, ...updatedPrompt} : prompt
    );
    setPrompts(updatedPrompts);
  };


  const addPrompt = async () => {
    try {
        setLoading(false);
        const response = await fetch('https://api.perplexity.ai/chat/completions', generateOptions()); // Wait for the fetch to complete
        const data = await response.json(); // Wait for the response to be parsed as JSON
        console.log(data); // Log the response data
        setPastMessages([...pastMessages, data.choices[0].message.content])
        setPrompts([...prompts, { id: uuidv4(), question: `${data.choices[0].message.content}`, textareaData: '', children: [] }]);
        setLoading(true);
      } catch (err) {
        console.error('Error fetching completion:', err); // Log any errors
      }
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

  const refreshPrompt = async (id) => {
    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', generateOptions()); // Wait for the fetch to complete
        const data = await response.json(); // Wait for the response to be parsed as JSON
        console.log(data); // Log the response data
        setPastMessages([...pastMessages, data.choices[0].message.content])
        setPrompts(
        prompts.map((prompt) =>
            prompt.id === id
            ? { ...prompt, question: `${data.choices[0].message.content}`, textareaData: '', children: [] }
            : prompt
        )
        );
    } catch (err) {
        console.error('Error fetching completion:', err); // Log any errors
    }
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

  const handleBack = () => {
    console.log(data)
    navigate('/');
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="journal-container">
        <img src='/back_button.jpg' className='back-button' onClick={handleBack}>
        </img>
      <div className="journal-content">
        <h1 className="journal-title">{data.event}</h1>
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
      </div>
      {loading ? (<button className="delve-button" onClick={addPrompt}></button>) : (<button className="loading-button"></button>)}
    </div>
  );
};

export default JournalEntry;