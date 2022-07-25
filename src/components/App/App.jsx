import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import RestaurantView from '../RestaurantView/RestaurantView';
import ItemView from '../ItemView/ItemView';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  {/* The useState for hiding the navbar and footer, and updating the delivery address, 
    user authentication, and user profile */}
  const [hideNavbar, setHideNavbar] = useState(false);
  const [address, setAddress] = useState('');
  const [cityState, setCityState] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [footer, setFooter] = useState(true);

  return (
    <div className="app">
      {/* To hide the navbar on specific pages/routes */}
      {!hideNavbar ? (
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          setAddress={setAddress}
          address={address}
          cityState={cityState}
          setCityState={setCityState}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      ) : null}
      <Routes>
        {/* The Landing page where the user enter it's delivery address */}
        <Route
          path="/"
          exact
          element={
            <Landing
              address={address}
              setAddress={setAddress}
              cityState={cityState}
              setCityState={setCityState}
              setFooter={setFooter}
              setHideNavbar={setHideNavbar}
            />
          }
        />
        {/* The Login page where the user can log it's account in */}
        <Route
          path="/login"
          element={
            <Login
              setFooter={setFooter}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
              setHideNavbar={setHideNavbar}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
            />
          }
        />
        {/* The Register Page where the user can set up its new account */}
        <Route
          path="/register"
          element={
            <Register
              setFooter={setFooter}
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
              setHideNavbar={setHideNavbar}
              setUserInfo={setUserInfo}
            />
          }
        />
        {/* The Dashboard page where the user can browse nearby restaurant */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              setFooter={setFooter}
              setHideNavbar={setHideNavbar}
              userInfo={userInfo}
              address={address}
              cityState={cityState}
            />
          }
        />
        {/* The Restauant page where the user can view the restaurant menu it has enter */}
        <Route path="/restaurant-view" element={<RestaurantView />} />
        {/* The Item page where the user can view the food/drink that the restaurant has to offer */}
        <Route path="/item-view" element={<ItemView/>}/>
        {/* The Profile page where the user can view its profile, recent review, and updates its review */}
        <Route
          path="/profile"
          element={
            <Profile userInfo={userInfo} isAuthenticated={isAuthenticated} />
          }
        />
      </Routes>
      {/* To hide the footer on specific pages/routes */}
      {footer ? <Footer /> : null}
    </div>
  );
}

export default App;
