import React from 'react';
import './RestaurantCard.css';

export default function RestaurantCard({ name, img }) {
  return (
    <div className="restaurant-card">
      <img src={img} className="img" />
      <p>{name}</p>
    </div>
  );
}
