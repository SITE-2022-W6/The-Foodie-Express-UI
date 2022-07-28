import React from 'react';
import apiClient from '../../services/apiClient';
import { Ripple } from 'react-spinners-css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link as ScrollTo } from 'react-scroll';
import Rating from 'react-rating';
import data from '../banner.json';
import './RestaurantView.css';

export default function RestaurantView() {
  
  // The JSON variable from the api to display the menu from the given restaurant id

  const [restaurantInfo, setRestaurantsInfo] = useState([])
  const [menu, setMenu] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getMenu(menuId) {
      setIsLoading(true);
      const menuList = await apiClient.getMenuByOpenMenuId(menuId);
      console.log(menuList.data.menu)
      setRestaurantsInfo(menuList.data.menu.restaurant_info)
      setMenu(menuList.data.menu.menu)
      console.log(menuList.data.menu)
      setIsLoading(false);
    }
    getMenu(id);
  }, [id]);

  console.log(restaurantInfo)
  console.log(menu)

  return (
    <div className="grid">
      {!isLoading ? <div className="restaurant-view">
        {/* Restauant Header */}
        <div className="banner">
          <img
            src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            className="banner"
          />
        </div>
        <div className="heading">
          <h1>{restaurantInfo.restaurant_name}</h1>
          <Rating fractions={2} readonly />
          {restaurantInfo.brief_description && <h3>{restaurantInfo.brief_description}</h3>}
          <p>{restaurantInfo.address_1}, {restaurantInfo.city_town}, {restaurantInfo.state_province}</p>
          {restaurantInfo.phone && <p>Phone: {restaurantInfo.phone}</p>}
        </div>
        <div className="menu">
          {menu.map(m => {
            return (
              <div>
                <h1>{m.menu_name}</h1>
                {m.menu_groups.map(group => {
                  return (
                    <div id={group.group_name}>
                      <h2>{group.group_name}</h2>
                      {group.menu_items.map(item => {
                        return (
                          <div className="item">
                            <p style={{fontWeight: 'bold'}}>{item.menu_item_name}</p>
                            {item.menu_item_description ? <p className="description">{item.menu_item_description}</p> : null}
                            
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ) 
          })}
        </div>
      </div> : <h1>Loading <Ripple/></h1>}
      <div className="menu-box">
      {menu.map(m => {
            return (
              <div>
                <h2>{m.menu_name}</h2>
                {m.menu_groups.map(group => {
                  return (
                    <div>
                      <ScrollTo to={group.group_name} smooth={true} duration={500} offset={-25}>
                        <h3>{group.group_name}</h3>
                      </ScrollTo>
                    </div>
                  )
                })}
              </div>
            ) 
          })}
      </div>
    </div>
  );
}
