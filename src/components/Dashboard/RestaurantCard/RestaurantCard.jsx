import React from 'react';
import data from '../../banner.json'
import './RestaurantCard.css';

export default function RestaurantCard(props) {
  const banner = new Map(Object.entries(data));
  return (
    <div className="restaurant-card">
      <img src={banner.has(props.restaurant.cuisine_type_primary) ? banner.get(props.restaurant.cuisine_type_primary) : './banner.png'} className="banner"/>
      <div className="info">
        <h2 className="title">{props.restaurant.restaurant_name}</h2>
        <p className="address">{props.restaurant.address_1}</p>
      </div>
    </div>
  );
}
