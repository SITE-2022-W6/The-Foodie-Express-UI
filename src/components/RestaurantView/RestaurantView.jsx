import React from 'react';
import apiClient from '../../services/apiClient';
import { Ripple } from 'react-spinners-css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Link as ScrollTo } from 'react-scroll';
import Rating from 'react-rating';
import data from '../banner.json';
import './RestaurantView.css';

export default function RestaurantView() {
  
  // The JSON variable from the api to display the menu from the given restaurant id

  const [restaurantInfo, setRestaurantsInfo] = useState([])
  const [cuisine, setCuisine] = useState('')
  const [menu, setMenu] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const banner = new Map(Object.entries(data));

  useEffect(() => {
    async function getMenu(menuId) {
      setIsLoading(true);
      const menuList = await apiClient.getMenuByOpenMenuId(menuId);
      //console.log(menuList);
      setRestaurantsInfo(menuList.data.menu.restaurant_info)
      setCuisine(menuList.data.menu.environment_info.cuisine_type_primary)
      setMenu(menuList.data.menu.menu)
      setIsLoading(false);
    }
    getMenu(id);
  }, [id]);

  return (
    <div className="grid">
      {!isLoading ? <div className="restaurant-view">
        {/* Restauant Header */}
        <div className="banner">
          <img
            src={banner.has(cuisine) ? banner.get(cuisine) : './banner.png'}
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
          {menu.map((m, index) => {
            let menuId = index;
            return (
              <div key={menuId}>
                <h1>{m.menu_name}</h1>
                {m.menu_groups.map((group, index) => {
                  let groupId = index;
                  return (
                    <div id={group.group_name} key={groupId}>
                      <h2>{group.group_name}</h2>
                      {group.menu_items.map((item, index) =>{
                        let itemId = index;
                        return (
                          <div className="item" key={itemId}>
                            <Link to={`/item/${id}/${item.menu_item_name}`} style={{textDecoration: 'none', color: '#000000'}}>
                              <p className="title">{item.menu_item_name}</p>
                              {item.menu_item_description ? <p className="description">{item.menu_item_description}</p> : null}
                            </Link>
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
