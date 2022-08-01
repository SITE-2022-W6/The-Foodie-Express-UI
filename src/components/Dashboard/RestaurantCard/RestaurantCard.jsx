import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../banner.json'
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import './RestaurantCard.css';

export default function RestaurantCard(props) {
  const banner = new Map(Object.entries(data));
  const getBanner = (data) => {
    if (banner.has(data)) {
      return banner.get(data)
    } else {
      let keyWord = data.split(" ");
      if (banner.has(keyWord[0])) {
        return banner.get(keyWord[0])
      }
      return './banner.svg'
    }
  }
  return (
      <div className="restaurant-card" key={props.restaurant.id}>
        <Link to={`/restaurant/${props.restaurant.id}`} style={{textDecoration: 'none', color: '#000000'}}>
          <img src={getBanner(props.restaurant.cuisine_type_primary)} className="banner"/>
          <div className="info">
            <h2 className="title">{props.restaurant.restaurant_name}</h2>
            <p className="address">{props.restaurant.address_1}</p>
            <Rating
              placeholderRating={3.5}
              fractions={2}
              placeholderSymbol={<BsStarFill size={20}/>}
              emptySymbol={<BsStar size={20}/>}
              fullSymbol={<BsStarFill size={20}/>}
              readonly
            />
          </div>
        </Link>
      </div>
  );
}
