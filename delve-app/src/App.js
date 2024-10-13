import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import JournalEntry from './components/JournalEntry';
import { useState } from 'react';

function App() {

  const [data, setData] = useState([]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing data = {data} setData = {setData} />} />
          <Route path="/journal" element={<JournalEntry data = {data}/>} /> {/* Dynamic route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
