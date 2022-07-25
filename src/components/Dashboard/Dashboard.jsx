import * as React from 'react';
import './Dashboard.css';
import apiClient from '../../services/apiClient';


export default function Dashboard(props) {
  props.setHideNavbar(false);
  props.setFooter(true);
  const [restaurants, setRestaurants] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function getRestaurants(cityState)
    {
      const restaurantlist = await apiClient.getRestaurantsByLocation(cityState)
      // console.log(restaurantlist)
      setRestaurants(restaurantlist)
      setIsLoading(false)

    }
    setIsLoading(true)
    getRestaurants(props.cityState)
  }, [props.cityState])

  return (
    <div className="Dashboard">
      {isLoading && <h1> Loading... </h1>}
      {!isLoading && <h1 style={{textAlign: 'center', fontSize: '6em'}}>Hi Stranger, looks like you're hungry. Here at The Foodie Express you can order the food at any time and any where you want to eat. So right now we're in the process of building this app and we'll be finish it by August 11.</h1>}
    </div>
  )
}