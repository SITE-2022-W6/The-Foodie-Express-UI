import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../banner.json'
import './RestaurantCard.css';

export default function RestaurantCard(props) {
  const banner = new Map(Object.entries(data));
  //To calculate distances with Google API
  const service = new google.maps.DistanceMatrixService()
  const restaurantAddress = props.restaurant?.address_1 + "," + props.restaurant?.city_town + "," + props.restaurant?.state_province + "," + props.restaurant?.postal_code
  const [distance, setDistance] = React.useState("")
  const [gotDistance, setGotDistance] = React.useState(false)

  async function calculateDistance()
  {
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
        else if(status === "ZERO_RESULTS")
        {
          setDistance("No route could be found between the origin and destination")
        }
        //else if status === "NOT_FOUND"
        else {
          setDistance("The origin and/or destination of this pairing could not be geocoded")
        }
        setGotDistance(true)
      }
    )
  }

  calculateDistance()

  return (
      <> {gotDistance && <div className="restaurant-card" key={props.restaurant.id}>
        <Link to={`/restaurant/${props.restaurant.id}`} style={{textDecoration: 'none', color: '#000000'}}>
          <img src={banner.has(props.restaurant.cuisine_type_primary) ? banner.get(props.restaurant.cuisine_type_primary) : './banner.png'} className="banner"/>
          <div className="info">
            <h2 className="title">{props.restaurant.restaurant_name}</h2>
            <p className="address">{props.restaurant.address_1}</p>
            <p className="distance">{distance}</p>
          </div>
        </Link>
      </div>} </>
  );
}
