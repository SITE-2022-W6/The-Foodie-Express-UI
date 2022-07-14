import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './App.css';

function App() {
  const [isLandingPage, setIsLandingPage] = useState(false)
  const [hideNavbar, setHideNavbar] = useState(false)
  const heroStyle = {
    backgroundImage: 'url("./hero-image.jpeg")',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  }
  return (
    <div className="app" style={isLandingPage ? heroStyle : {background: 'linear-gradient(45deg, #cae9ff 0%, #99ecfe 100%)'}}>
      {hideNavbar ? null : <Navbar/>}
      <Routes>
        <Route path="/" exact element={<Landing setIsLandingPage={setIsLandingPage} setHideNavbar={setHideNavbar}/>} />
        <Route path="/login" element={<Login setIsLandingPage={setIsLandingPage} setHideNavbar={setHideNavbar}/>} />
        <Route path="/register" element={<Register setIsLandingPage={setIsLandingPage} setHideNavbar={setHideNavbar}/>} />
      </Routes>
    </div>
  );
}

export default App;
