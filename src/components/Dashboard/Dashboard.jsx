import React from 'react';
import { Navigate } from 'react-router-dom';
import { Ripple } from 'react-spinners-css';
import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import './Dashboard.css';
import apiClient from '../../services/apiClient';


export default function Dashboard(props) {
  {/* useState to find the restaurant with the given search term */}
  const [searchTerm, setSearchTerm] = useState('');
  const [restType, setRestType] = useState('')

  {/* To update the search term useState */}
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeCat = (e) => {
    setRestType(e.target.value)
  }

  {/* Toggle whether to hide the navbar and/or footer */}
  props.setHideNavbar(false);
  props.setFooter(true);

  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const restaurantType = new Set();

  restaurants.map(restaurant => {
    restaurantType.add(restaurant.cuisine_type_primary);
  })

  useEffect(() => {
    async function getRestaurants(cityState)
    {
      setIsLoading(true)
      const restaurantlist = await apiClient.getRestaurantsByLocation(cityState)
      console.log(restaurantlist.data.restaurants)
      setRestaurants(restaurantlist.data.restaurants)
      setIsLoading(false)
    }
    getRestaurants(props.cityState)
  }, [props.cityState])

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
        <select name="food-type" onChange={handleChangeCat}>
          <option value="">All</option>
          {Array.from(restaurantType).map(type => {
            return <option value={type}>{type}</option>
          })}
        </select>
        <select name="category">
          <option value="nearby">Nearby</option>
          <option value="recommended">Recommended</option>
        </select>
      </div>
      {!isLoading ?
      <div className="grid">
        {restaurants.filter(cat => {
        if(restType) {
          return cat.cuisine_type_primary === restType
        }
        return cat
        })
        .filter(val => {
        if (searchTerm === "") {
          return val
        } else if (val.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
        }).map(restaurant => {
          return <RestaurantCard restaurant={restaurant}/>
        })}
      </div> : <h1>Loading <Ripple/></h1>}
    </div>
  );
}
