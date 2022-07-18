import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [address, setAddress] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [footer, setFooter] = useState(true);
  return (
    <div className="app">
      {!hideNavbar ? (
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          setAddress={setAddress}
          address={address}
        />
      ) : null}
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Landing
              address={address}
              setAddress={setAddress}
              setFooter={setFooter}
              setHideNavbar={setHideNavbar}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setFooter={setFooter}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
              setHideNavbar={setHideNavbar}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setFooter={setFooter}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
              setHideNavbar={setHideNavbar}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard setFooter={setFooter} setHideNavbar={setHideNavbar} />
          }
        />
      </Routes>
      {footer ? <Footer /> : null}
    </div>
  );
}

export default App;
