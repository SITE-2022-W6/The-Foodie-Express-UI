import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import Rating from 'react-rating';
import Loading from '../Loading/Loading';
import { BsStar, BsStarFill } from 'react-icons/bs';
import apiClient from '../../services/apiClient';
import { Navigate } from 'react-router-dom';
import './Profile.css';

export default function Profile(props) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantInfo, setRestaurntInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  async function deleteSelectedReview(id) {
    setIsLoading(true);
    await apiClient.deleteReview(id);
    setIsOpen(false);
    setIsLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getReviewsFromUser(id) {
      setIsLoading(true);
      const reviewList = await apiClient.getReviews(id);
      setReviews(reviewList.data.all);
      setIsLoading(false);
    }
    getReviewsFromUser(props.userInfo.id);
  }, [props.userInfo.id]);

  return (
    <div className="profile navbar-margin-top">
      {/* Checks if the user is logged in, if not it will redirect to the login page*/}
      {!props.isAuthenticated && <Navigate to="/login" replace={true} />}
      <div className="main">
        {/* The profile of the user */}
        <img
          src="https://www.megautilities.org/wp-content/uploads/2019/05/profile.png"
          className="pfp"
        />
        <h1 className="name">{`${props.userInfo.firstName} ${props.userInfo.lastName}`}</h1>
        <p>Email: {props.userInfo.email}</p>
        <p>Phone: {props.userInfo.phoneNumber}</p>
        <p>Bio: Lorem ipsum dolor sit amet, consectetur adip</p>
        <button className="btn">Account Settings</button>
      </div>
      <div className="recent-review">
        <h1>Recent Review</h1>
        {!isLoading ? (
          reviews.map((review) => {
            let date = review.created_at.split('-');
            date[2] = date[2].substring(0, 2);
            return (
              <div className="profile-review">
                <div className="header">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '0.5em 0',
                    }}
                  >
                    <h2 style={{ margin: '0' }}>{review.menu_item_name} ()</h2>
                    <p style={{ margin: '0' }}>{`${Number(date[1])} / ${Number(
                      date[2]
                    )} / ${Number(date[0])}`}</p>
                  </div>
                  <Rating
                    initialRating={review.rating}
                    emptySymbol={<BsStar size={20} />}
                    fullSymbol={<BsStarFill size={20} />}
                    style={{ margin: '0.5em 0' }}
                    readonly
                  />
                </div>
                <div style={{ margin: '0.5em 0' }}>{review.content}</div>
                <div>
                  <button className="btn delete-btn" onClick={() => setIsOpen(true)}>Delete</button>
                  <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <h1>Are you sure you want to delete this review?</h1>
                    <button className="btn yes-btn">Yes</button>
                    <button className="btn no-btn" onClick={() => setIsOpen(false)}>No</button>
                  </Modal>
                </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
