import React from 'react';
import Modal from '../../Modal/Modal';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import apiClient from '../../../services/apiClient';
import './Review.css';

export default function Review({itemName, rating, content, id, createdAt, isOpen, setIsOpen = () =>{}, setIsLoading = () =>{}, setDelId = () =>{}, delId}) {

    async function deleteSelectedReview() {
        setIsLoading(true);
        await apiClient.deleteReview(delId);
        setIsOpen(false);
        setIsLoading(false);
        window.location.reload();
    }

    let date = createdAt.split('-');
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
                    <h2 style={{ margin: '0' }}>{itemName}</h2>
                    <p style={{ margin: '0' }}>{`${Number(date[1])} / ${Number(
                        date[2]
                    )} / ${Number(date[0])}`}</p>
                </div>
                <Rating
                    initialRating={rating}
                    emptySymbol={<BsStar size={20} />}
                    fullSymbol={<BsStarFill size={20} />}
                    style={{ margin: '0.5em 0' }}
                    readonly
                />
            </div>
            <div style={{ margin: '0.5em 0' }}>{content}</div>
            <div>
                <button className="btn delete-btn" onClick={() => {
                    setDelId(id)
                    setIsOpen(true)}}>Delete</button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <h1>Are you sure you want to delete this review?</h1>
                    <button className="btn yes-btn" onClick={() => { deleteSelectedReview() }}>Yes</button>
                    <button className="btn no-btn" onClick={() => setIsOpen(false)}>No</button>
                </Modal>
            </div>
        </div>
    );
}