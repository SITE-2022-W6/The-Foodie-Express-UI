import React from 'react';
import './RecentReview.css';

export default function RecentReview(props) {
  return (
    <div className="recent-review">
      <h1>Recent Reviews</h1>
      <Review/>
    </div>
  );
}

export function Review() {
  return (
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
  );
}
