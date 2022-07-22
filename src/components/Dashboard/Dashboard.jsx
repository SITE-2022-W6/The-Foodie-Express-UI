import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import './Dashboard.css';

export default function Dashboard(props) {
  {/* useState to find the restaurant with the given search term */}
  const [searchTerm, setSearchTerm] = useState('');

  {/* To update the search term useState */}
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  {/* Toggle whether to hide the navbar and/or footer */}
  props.setHideNavbar(false);
  props.setFooter(true);

  return (
    <div className="dashboard">
      <h1>
        {/* Welcoming user who log on or not logged in */}
        Hi {props.userInfo.firstName ? props.userInfo.firstName : 'Stranger'},
        looks like you'll find the best food to eat
      </h1>
      <div className="filter-session">
        {/* Search bar and Filtering the restaurants */}
        <input
          type="text"
          className="input search-input"
          onChange={handleChange}
        />
        <select name="food-type">
          <option value="">All</option>
          <option value="pizza">Pizza</option>
          <option value="fast-food">Fast Food</option>
          <option value="bbq">BBQ</option>
        </select>
        <select name="category">
          <option value="nearby">Nearby</option>
          <option value="pizza">Trending</option>
          <option value="fast-food">Recommended</option>
        </select>
      </div>
      <div className="grid">
        {/* Display the restaurants with filter and search term modification */}
        {/*restaurants
          .filter(val => {
            if (searchTerm === '') {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((restaurant) => {
            return (
              <RestaurantCard name={restaurant.name} img={restaurant.img} />
            );
          })*/}
      </div>
    </div>
  );
}
