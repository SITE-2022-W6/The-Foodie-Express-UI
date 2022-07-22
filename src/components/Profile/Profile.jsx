import React from 'react'
import RecentReview from './RecentReview/RecentReview'
import UpdateReview from './UpdateReview/UpdateReview';
import { Navigate } from 'react-router-dom';
import './Profile.css'

export default function Profile(props) {
  return (
    <div className="profile">
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
      <div className="view">
        {/* The other side which the user can see its recent review and can update the review */}
        <RecentReview />
        <UpdateReview />
      </div>
    </div>
  )
}
