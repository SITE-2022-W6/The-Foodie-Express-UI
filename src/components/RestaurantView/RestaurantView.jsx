import React from 'react';
import bannerImg from '../../../public/banner.svg';
import apiClient from '../../services/apiClient';
import Loading from '../Loading/Loading';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Link as ScrollTo } from 'react-scroll';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import data from '../banner.json';
import './RestaurantView.css';

export default function RestaurantView() {
  // The JSON variable from the api to display the menu from the given restaurant id

  const [restaurantInfo, setRestaurantsInfo] = useState([]);
  const [cuisine, setCuisine] = useState('');
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [rating, setRating] = useState()

  const banner = new Map(Object.entries(data));

  const getBanner = (name, data) => {
    if (banner.has(name)) {
      return banner.get(name)
    }
    if (banner.has(data)) {
      return banner.get(data);
    } else {
      let keyWord = data.split(' ');
      if (banner.has(keyWord[0])) {
        return banner.get(keyWord[0]);
      }
      return bannerImg;
    }
  };

  async function getAverageRating()
  {
    const rating = await apiClient.getRestaurantAverageRating(id)
    setRating(rating.data.rating.avg)
  }
  
  useEffect(() => {
    window.scrollTo(0, 0)
    async function getMenu(menuId) {
      setIsLoading(true);
      const menuList = await apiClient.getMenuByOpenMenuId(menuId);
      setRestaurantsInfo(menuList.data.menu.restaurant_info);
      setCuisine(menuList.data.menu.environment_info.cuisine_type_primary);
      setMenu(menuList.data.menu.menu);
      setIsLoading(false);
    }
    getMenu(id);
    getAverageRating()
  }, [id]);

  return (
    <div className="grid navbar-margin-top">
      {!isLoading ? (
        <div className="restaurant-view">
          {/* Restauant Header */}
          <div className="banner">
            <img src={getBanner(restaurantInfo.restaurant_name, cuisine)} className="banner" />
          </div>
          <div className="heading" style={{marginBottom: '2em'}}>
            <h1 style={{marginBottom: "0"}}>{restaurantInfo.restaurant_name}</h1>
            <div className="info" style={{display: 'flex', gap: '10px', alignItems: 'center', margin: '0'}}>
              <span>{restaurantInfo.address_1}, {restaurantInfo.city_town},{' '}
              {restaurantInfo.state_province} </span>
              {restaurantInfo.phone && <span>{'•'}</span>}
              {restaurantInfo.phone && <span>{restaurantInfo.phone}</span>}
              {cuisine && <span>{'•'}</span>}
              {cuisine && <span>{cuisine}</span>}
              {rating && <><span>{'•'}</span>
              <span>
                <Rating
                  placeholderRating={rating}
                  fractions={2}
                  placeholderSymbol={<BsStarFill size={16}/>}
                  emptySymbol={<BsStar size={16}/>}
                  fullSymbol={<BsStarFill size={16}/>}
                  readonly
                />
              </span></>}
            </div>
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
                        {group.menu_items.map((item, index) => {
                          let itemId = index;
                          return (
                            <div className="item" key={itemId}>
                              <Link
                                to={`/item/${id}/${item.menu_item_name}`}
                                style={{
                                  textDecoration: 'none',
                                  color: '#000000',
                                }}
                              >
                                <p className="title">{item.menu_item_name}</p>
                                {item.menu_item_description ? (
                                  <p className="description">
                                    {item.menu_item_description}
                                  </p>
                                ) : null}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : 
        <Loading/>
      }
      <div className="menu-box">
        {menu.map((m) => {
          return (
            <div>
              <h2>{m.menu_name}</h2>
              {m.menu_groups.map((group) => {
                return (
                  <div>
                    <ScrollTo
                      to={group.group_name}
                      smooth={true}
                      duration={500}
                      offset={-125}
                    >
                      <h3>{group.group_name}</h3>
                    </ScrollTo>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
