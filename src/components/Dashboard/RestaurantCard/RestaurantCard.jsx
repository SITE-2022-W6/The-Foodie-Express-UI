import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../banner.json'
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import './RestaurantCard.css';
import apiClient from '../../../services/apiClient';

export default function RestaurantCard(props) {
  const banner = new Map(Object.entries(data));

  const getBanner = (name, data) => {
    if (banner.has(name)) {
      return banner.get(name)
    }
    if (banner.has(data)) {
      return banner.get(data)
    } else {
      data = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      let keyWord = data.split(" ");
      if (banner.has(keyWord[0])) {
        return banner.get(keyWord[0])
      }
      return './banner.svg'
    }
  }

  //To calculate distances with Google API
  const service = new google.maps.DistanceMatrixService()
  const [distance, setDistance] = React.useState("")
  const [gotDistance, setGotDistance] = React.useState(false)
  const [rating, setRating] = React.useState()

  async function calculateDistance()
  {
    const restaurantAddress = props.restaurant?.address_1 + "," + props.restaurant?.city_town + "," + props.restaurant?.state_province + "," + props.restaurant?.postal_code
    service.getDistanceMatrix(
      {
        origins: [props.address],
        destinations: [restaurantAddress],
        travelMode: "DRIVING",
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, (response, status) => {
        if(status === "OK")
        {
          setDistance(response.rows[0].elements[0].distance.text)
        }
        else {
          setDistance("N/A")
        }
        setGotDistance(true)
      }
    )
  }

  async function getAverageRating()
  {
    const rating = await apiClient.getRestaurantAverageRating(props.restaurant.id)
    setRating(rating.data.rating.avg)
  }

  React.useEffect(() => {
    calculateDistance()
    getAverageRating()
  }, [])
  

  return (
      <> {gotDistance && <div className="restaurant-card" key={props.restaurant.id}>
        <Link to={`/restaurant/${props.restaurant.id}`} style={{textDecoration: 'none', color: '#000000'}}>
          <img src={getBanner(props.restaurant.restaurant_name, props.restaurant.cuisine_type_primary)} className="banner"/>
          <div className="info">
            <div className="head">
              <h2 className="restaurnat-title">{props.restaurant.restaurant_name}</h2>
              <p className="distance">{distance}</p>
            </div>
            <div className="head">
              <p className="address">{props.restaurant.address_1}</p>
              {rating && <Rating
                placeholderRating={rating}
                fractions={2}
                placeholderSymbol={<BsStarFill size={20}/>}
                emptySymbol={<BsStar size={20}/>}
                fullSymbol={<BsStarFill size={20}/>}
                readonly
              />}
            </div>
          </div>
        </Link>
      </div>} </>
  );
}
