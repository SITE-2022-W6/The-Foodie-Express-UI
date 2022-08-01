import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../banner.json'
import './RestaurantCard.css';

export default function RestaurantCard(props) {
  const banner = new Map(Object.entries(data));
  return (
      <div className="restaurant-card" key={props.restaurant.id}>
        <Link to={`/restaurant/${props.restaurant.id}`} style={{textDecoration: 'none', color: '#000000'}}>
          <img src={banner.has(props.restaurant.cuisine_type_primary) ? banner.get(props.restaurant.cuisine_type_primary) : './banner.png'} className="banner"/>
          <div className="info">
            <h2 className="title">{props.restaurant.restaurant_name}</h2>
            <p className="address">{props.restaurant.address_1}</p>
          </div>
        </Link>
      </div>
  );
}
