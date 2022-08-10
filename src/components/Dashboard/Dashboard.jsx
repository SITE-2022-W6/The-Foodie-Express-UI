import React from 'react';
import data from '../banner.json';
import { Ripple } from 'react-spinners-css';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import './Dashboard.css';
import apiClient from '../../services/apiClient';
import { BsFilter } from 'react-icons/bs';

export default function Dashboard(props) {
  /* useState to find the restaurant with the given search term */
  const [searchTerm, setSearchTerm] = useState('');
  const [restType, setRestType] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [statusCode, setStatusCode] = useState()
  const restaurantType = new Set();
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState("Nearby")
  const [recCuisine, setRecCuisine] = useState("")

  //To update the search term useState
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeCat = (e) => {
    setRestType(e.target.value);
  };

  //Handles changes to type of results being shown (Nearby or Recommended)
  const handleChangeFilter = async (e) => {
    console.log("changed")
    setIsLoading(true)
    setFilter(e.target.value)
    if(e.target.value === "Recommended")
    {
      const recommend = await apiClient.favoriteCuisine(props.userInfo.id)
      console.log(recommend)
      setRecCuisine(recommend.data.cuisine)
    }
    setIsLoading(false)
  }

  //Loads more restaurants
  async function loadMore() {
    setIsLoadingBtn(true);
    setOffset(offset + 1);
    const restaurantlist = await apiClient.getRestaurantsByLocation(
      props.cityState,
      offset + 1
    );
    setRestaurants([...restaurants, ...restaurantlist.data.restaurants]);
    setIsLoadingBtn(false);
  }

  //Toggle whether to hide the navbar and/or footer
  props.setHideNavbar(false);
  props.setFooter(true);

  //Saves the address on refresh
  useEffect(() => {
    //Get from local Storage
    const cs = window.localStorage.getItem("cityState")
    const add = window.localStorage.getItem("address")
    // console.log({cs})
    // console.log({add})
    // console.log(cs && cs != "null" )
    //If there was something in local storage, and nothing for the props
    //Set the props
    if(cs && cs != "null" && props.cityState == null)
    {
      // console.log("setting???")
      props.setCityState(JSON.parse(cs))
      props.setAddress(add)
    }
    //Else save the new address to local storage
    else{
      // console.log("LOCAL STORAGE")
      // console.log(props.cityState)
      // console.log(props.address)
      window.localStorage.setItem("address", props.address)
      window.localStorage.setItem("cityState", JSON.stringify(props.cityState))
    }
  }, [props.cityState])

  useEffect(() => {
     window.scrollTo(0, 0)
    async function getRestaurants(cs) {
      setOffset(0);
      setIsLoading(true);
      const restaurantlist = await apiClient.getRestaurantsByLocation(cs, 0);
      setRestaurants(restaurantlist.data.restaurants)
      setStatusCode(restaurantlist.status)
      setIsLoading(false)
      // console.log("ran")
    }
    getRestaurants(props.cityState);
  }, [props.cityState, filter]);

  const banner = new Map(Object.entries(data));
  if (statusCode == 200) {
    restaurants.map((restaurant) => {
      if (banner.has(restaurant.cuisine_type_primary)) {
        restaurantType.add(restaurant.cuisine_type_primary);
      } else {
        let cuisine = restaurant.cuisine_type_primary.replace(
          /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          ''
        );
        cuisine = cuisine.split(' ');
        restaurantType.add(cuisine[0]);
      }
    });
  }

  return (
    <div className="dashboard navbar-margin-top">
      {/* {!props.address && <Navigate to="/" />} */}
      <h1 style={{ fontSize: '3em' }}>
        {/* Welcoming user who log on or not logged in */}
        Hi {props.userInfo?.firstName ? props.userInfo.firstName : 'Stranger'},
        we'll find you the best food to eat 😋
      </h1>
      <div className="filter-session">
        {/* Search bar and Filtering the restaurants */}
        <input
          type="text"
          className="input search-input"
          onChange={handleChange}
          placeholder="Search Restauant Name"
        />
        <select className="select" name="food-type" onChange={handleChangeCat}>
          <option value="">All</option>
          {Array.from(restaurantType).map((type) => {
            return <option value={type}>{type}</option>;
          })}
        </select>
        <select className="select" name="category" onChange={handleChangeFilter}>
          <option value="Nearby">Nearby</option>
          <option value="Recommended">Recommended</option>
        </select>
      </div>
      {/* Not loading, and there are restaruants to display*/}
      {!isLoading && statusCode == 200 &&
        <div className="grid">
          {restaurants
            .filter((cat) => {
              //If filter is nearby
              if(filter === "Nearby")
              {
                if (restType) {
                  return cat.cuisine_type_primary === restType;
                }
              }
              //If filter is recommended
              else{
                return cat.cuisine_type_primary === recCuisine
              }
              return cat;
            })
            .filter((val) => {
              if (searchTerm === '') {
                return val;
              } else if (
                val.restaurant_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((restaurant) => {
              return (
                <RestaurantCard
                  restaurant={restaurant}
                  address={props.address}
                />
              );
            })}
        </div>}
        {/* Recommended Restaurants */}

        {/* Not loading, but there are no more restaurants to display */}
        {!isLoading && statusCode == 204 && <h1>No restaurants found at "{props.cityState.city}, {props.cityState.state}". Please try another address. </h1>}
        {/* Loading Results, display loading */}
        {isLoading && <Loading />}
      <div className="center-btn">
        {!isLoadingBtn ? (
          <button
            onClick={() => {
              loadMore();
            }}
            className="btn load-more-btn"
          >
            Load More
          </button>
        ) : (
          <button className="btn load-more-btn loading-more">
            <div style={{ margin: '0' }}>Loading More</div>
            <Ripple color="#ffffff" size={21} />
          </button>
        )}
      </div>
    </div>
  );
}
