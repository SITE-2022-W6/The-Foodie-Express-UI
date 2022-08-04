import React from 'react';
import Modal from '../Modal/Modal';
import Rating from 'react-rating';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useParams, Navigate } from 'react-router-dom';
import './ItemView.css';

export default function ItemView(props) {
  {/* The useState for toggling modal popup */}
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState({});
  const [ratingValue, setRatingValue] = useState(0)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('')
  const {restaurantId, itemName} = useParams()

  useEffect(() => {
    async function getItem(r, i) {
      setIsLoading(true);
      const itemInfo = await apiClient.getMenuItem(r, i);
      setItem(itemInfo.data.item);
      // console.log(item);
      setIsLoading(false);
      getReviews(r, i)
    };

    async function getReviews(r, i) {
      setIsLoading(true);
      const listOfReviews = await apiClient.getReviewsForItem(r, i);
      console.log(listOfReviews.data.reviews);
      setReviews(listOfReviews.data.reviews);
      setIsLoading(false);
    };
    // console.log(restaurantId)
    // console.log(itemName)
    getItem(restaurantId, itemName)
  }, [restaurantId, itemName]);

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleRatingChange = (value) => {
    setRatingValue(value)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const { data, error } = await apiClient.createReview({
      user_id: props.userInfo.id,
      restaurant_id: restaurantId,
      menu_item_name: itemName,
      rating: ratingValue,
      content: comment,
    });
    if (error) {
      return
    } 
    if (data?.review) {
      console.log(data.review)
    }
    setRatingValue(0);
    setComment('');
    setIsLoading(false);
    setIsOpen(false);
  }

  const avgRatingValue = () => {
    let sum = 0;
    let len = 0
    reviews.map(review => {
      sum += review.rating;
      ++len;
    });
    return (sum/len).toFixed(1);
  }

  return (
    <div className="center navbar-margin-top">
      <div className="item-view">
        {/* The heading of item */}
        <h1>{item.name}</h1>
        <h3>{item.group_name}</h3>
        <p>{item.description}</p>
        <Rating
          initialRating={avgRatingValue()}
          fractions={10}
          placeholderSymbol={<BsStarFill size={20}/>}
          emptySymbol={<BsStar size={20}/>}
          fullSymbol={<BsStarFill size={20}/>}
          readonly
        />
        <div className="address-modal">
          {/* A button to add a review via modal popup */}
          <button className="btn" onClick={() => setIsOpen(true)}>Add Review</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            {!props.isAuthenticated && <Navigate to="/login" /> }
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', flexWrapper: 'wrap'}}>
              <h1>Write a Review</h1>
              <Rating
                initialRating={ratingValue}
                emptySymbol={<BsStar size={20}/>}
                fullSymbol={<BsStarFill size={20}/>}
                onChange={handleRatingChange}
              />
              <textarea cols="40" rows="6" style={{resize: 'none'}} onChange={handleChange}></textarea>
              <button className="btn .login button" onClick={handleSubmit}>Submit your Review</button>
            </div>
          </Modal>
        </div>
        <h2>Review</h2>
        <div className="review-session">
          {/* A list of reviews on the item */}
          {reviews && reviews.map(review => {
            return (<Review comment={review.content} date={review.created_at} rating={review.rating} user_id={review.user_id}/>)
          })}
        </div>
      </div>
    </div>
  )
}

export function Review(props) {
  const [userName, setUserName] = React.useState()
  apiClient.getUserByUserId(props.user_id)
  .then(result => {
    setUserName(`${result.first_name} ${result.last_name}`)
  })
  return (
    <div className="review">
      <div className="header">
        <h3>{userName}</h3>
        <Rating
          initialRating={props.rating}
          fractions={2}
          placeholderSymbol={<BsStarFill size={20}/>}
          emptySymbol={<BsStar size={20}/>}
          fullSymbol={<BsStarFill size={20}/>}
          readonly
        />
        <p>{props.date}</p>
      </div>
      <div className="review-content">{props.comment}</div>
      <hr/>
    </div>
  )
}