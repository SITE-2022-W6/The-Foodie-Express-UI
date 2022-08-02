import React from 'react';
import Modal from '../Modal/Modal';
import Rating from 'react-rating';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import './ItemView.css';

export default function ItemView() {
  {/* The useState for toggling modal popup */}
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState({});
  const {restaurantId, itemName} = useParams('')

  useEffect(() => {
    async function getItem(r, i) {
      setIsLoading(true);
      const itemInfo = await apiClient.getMenuItem(r, i);
      setItem(itemInfo.data.item);
      // console.log(item);
      setIsLoading(false);
    }
    // console.log(restaurantId)
    // console.log(itemName)
    getItem(restaurantId, itemName)
  }, [restaurantId, itemName]);

  return (
    <div className="center">
      <div className="item-view">
        {/* The heading of item */}
        <h1>{item.name}</h1>
        <h3>{item.group_name}</h3>
        <p>{item.description}</p>
        <Rating
          placeholderRating={3.5}
          fractions={2}
          placeholderSymbol={<BsStarFill size={20}/>}
          emptySymbol={<BsStar size={20}/>}
          fullSymbol={<BsStarFill size={20}/>}
          readonly
        />
        <div className="address-modal">
          {/* A button to add a review via modal popup */}
          <button className="btn" onClick={() => setIsOpen(true)}>Add Review</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <h1>Write a Review</h1>
            <Rating fractions={2}/>
            <textarea></textarea>
            <button className="btn" onClick={() => setIsOpen(false)}>Submit your Review</button>
          </Modal>
        </div>
        <h2>Review</h2>
        <div className="review-session">
          {/* A list of reviews on the item */}
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
      </div>
    </div>
  )
}

export function Review(props) {
  return (
    <div className="review">
      <div className="header">
        <h3>User Name</h3>
        <Rating
          placeholderRating={3.5}
          fractions={2}
          placeholderSymbol={<BsStarFill size={20}/>}
          emptySymbol={<BsStar size={20}/>}
          fullSymbol={<BsStarFill size={20}/>}
          readonly
        />
        <p>Date:</p>
      </div>
      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <hr/>
    </div>
  )
}