import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import JournalEntry from './components/JournalEntry';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<JournalEntry />} />
          <Route path="/journal/:title" element={<JournalEntry />} /> {/* Dynamic route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
