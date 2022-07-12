import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Landing from '../Landing/Landing';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
