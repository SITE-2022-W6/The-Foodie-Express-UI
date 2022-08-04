import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import './Profile.css'

export default function Profile(props) {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className="profile navbar-margin-top">
      {/* Checks if the user is logged in, if not it will redirect to the login page*/}
      {!props.isAuthenticated && <Navigate to="/login" replace={true} />}
      <div className="main">
        {/* The profile of the user */}
        <img src="https://www.megautilities.org/wp-content/uploads/2019/05/profile.png" className="pfp"/>
        <h1 className="name">{`${props.userInfo.firstName} ${props.userInfo.lastName}`}</h1>
        <p>Email: {props.userInfo.email}</p>
        <p>Phone: {props.userInfo.phoneNumber}</p>
        <p>Bio: Lorem ipsum dolor sit amet, consectetur adip</p>
        <button className="btn">Account Settings</button>
      </div>
      <div className="recent-review">
        <h1>Recent Review</h1>
        <div className="review">
          <div className="header">
            <h1>Food Name from Restaurant Name</h1>
            <p>Rating</p>
            <p>Date</p>
          </div>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <button className="btn">Edit</button>
        </div>
      </div>
    </div>
  )
}
