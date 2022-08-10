import React from 'react';
import Modal from '../Modal/Modal';
import Rating from 'react-rating';
import apiClient from '../../services/apiClient';
import Loading from '../Loading/Loading';
import { useState, useEffect } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useParams, Navigate } from 'react-router-dom';
import './ItemView.css';

export default function ItemView(props) {
  {
    /* The useState for toggling modal popup */
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantInfo, setRestaurntInfo] = useState({});
  const [item, setItem] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const { restaurantId, itemName } = useParams();
  const [userName, setUserName] = React.useState();
  const [restId, setRestId] = React.useState();


  useEffect(() => {
    async function getItem(r, i) {
      setIsLoading(true);
      const itemInfo = await apiClient.getMenuItem(r, i);
      setItem(itemInfo.data.item);
      getReviews(r, i);
    }

    async function getReviews(r, i) {
      window.scrollTo(0, 0);
      const listOfReviews = await apiClient.getReviewsForItem(r, i);
      setReviews(listOfReviews.data.reviews);
      setIsLoading(false);
    }
    getItem(restaurantId, itemName);
    apiClient.getMenuByOpenMenuId(restaurantId).then((restaurant) => {
      setRestaurntInfo(restaurant.data.menu.restaurant_info);
    });
    async function setId() {
      const id = await apiClient.getIdFromOpenMenuId(restaurantId)
      setRestId(id.id)
    }
    setId()
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRatingValue(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data, error } = await apiClient.createReview({
      user_id: props.userInfo.id,
      restaurant_id: restaurantId,
      rest_id: restId,
      menu_item_name: itemName,
      rating: ratingValue,
      content: comment,
    });
    if (error) {
      return;
    }
    if (data?.review) {
    }
    setRatingValue(0);
    setComment('');
    setIsLoading(false);
    setIsOpen(false);
    window.location.reload();
  };

  const avgRatingValue = () => {
    let sum = 0;
    let len = 0;
    reviews.map((review) => {
      sum += review.rating;
      ++len;
    });
    return (sum / len).toFixed(1);
  };

  return (
    <>
      {' '}
      {!isLoading ? (
        <div className="center navbar-margin-top">
          <div className="item-view">
            <div className="item-heading">
              {/* The heading of item */}
              <h1 style={{}}>{item.name}</h1>
              <h3>
                {restaurantInfo.restaurant_name} at {restaurantInfo.address_1},{' '}
                {restaurantInfo.city_town}, {restaurantInfo.state_province}
              </h3>
              <Rating
                initialRating={avgRatingValue()}
                fractions={10}
                placeholderSymbol={<BsStarFill size={20} />}
                emptySymbol={<BsStar size={20} />}
                fullSymbol={<BsStarFill size={20} />}
                readonly
              />
            </div>
            <p>{item.description}</p>
            <div className="address-modal">
              {/* A button to add a review via modal popup */}
              <button className="btn add-review-btn" onClick={() => setIsOpen(true)}>
                Add Review
              </button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {!props.isAuthenticated && <Navigate to="/login" />}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                  }}
                >
                  <h1 style={{ margin: '0' }}>Write a Review</h1>
                  <Rating
                    initialRating={ratingValue}
                    emptySymbol={<BsStar size={20} />}
                    fullSymbol={<BsStarFill size={20} />}
                    onChange={handleRatingChange}
                    style={{ margin: '1em 0' }}
                  />
                  <textarea className="textarea"
                    cols="40"
                    rows="4"
                    style={{ resize: 'none' }}
                    onChange={handleChange}
                  ></textarea>
                  <div style={{marginTop: "1em"}}>
                    <button className="btn submit-review-btn" onClick={handleSubmit}>
                      Submit your Review
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
            <h2>Review</h2>
            <div className="review-session">
              {/* A list of reviews on the item */}
              {reviews && <Reviews reviews={reviews} />}
            </div>
          </div>
        </div>
      ) : <Loading/>}
    </>
  );
}

export function Reviews({ reviews }) {
  return reviews.map((review, idx) => {
    const userName = review.first_name + ' ' + review.last_name;
    return (
      <Review
        key={idx}
        comment={review.content}
        date={review.created_at}
        rating={review.rating}
        userName={userName}
      />
    );
  });
}

export function Review(props) {
  let date = props.date.split('-');
  date[2] = date[2].substring(0, 2);
  return (
    <div className="item-review">
      <div className="header">
        <div className="name-date">
          <h3 style={{margin: '0' }}>{props.userName}</h3>
          <p style={{margin: '0' }}>{`${Number(date[1])} / ${Number(date[2])} / ${Number(
            date[0]
          )}`}</p>
        </div>
        <Rating
          initialRating={props.rating}
          fractions={2}
          placeholderSymbol={<BsStarFill size={20} />}
          emptySymbol={<BsStar size={20} />}
          fullSymbol={<BsStarFill size={20} />}
          readonly
        />
      </div>
      <div className="review-content">{props.comment}</div>
    </div>
  );
}
