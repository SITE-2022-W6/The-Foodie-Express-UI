import React from 'react';
import './UpdateReview.css';

export default function UpdateReview() {
  return (
    <div className="update-review">
      <h1>Food Name</h1>
      <p>Review #</p>
      <div className="session">
        <p>User Name</p>
        <p>Rating</p>
        <textarea>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
        <button className="btn">Update Review</button>
      </div>
    </div>
  );
}
