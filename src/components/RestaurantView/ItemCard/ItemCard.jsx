import React from 'react';
import apiClient from '../../../services/apiClient';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import './ItemCard.css';


export default function ItemCard({ restaurantId, itemName, itemDescription}) {
    const [rating, setRating] = React.useState()

    async function getAverageRating() {
        const avgRating = await apiClient.getMenuItemAverageRating(restaurantId, itemName)
        setRating(avgRating.data.average.round)
    }

    useEffect(() => {
        getAverageRating()
    }, [])

    return (
        <Link
            to={`/item/${restaurantId}/${itemName}`}
            style={{
                textDecoration: 'none',
                color: '#000000',
            }}
        >
            <p className="title">{itemName}</p>
            {itemDescription ? (
                <p className="description">
                    {itemDescription}
                </p>
            ) : null}
            {rating &&
                <Rating
                  placeholderRating={rating}
                  fractions={2}
                  placeholderSymbol={<BsStarFill size={16}/>}
                  emptySymbol={<BsStar size={16}/>}
                  fullSymbol={<BsStarFill size={16}/>}
                  readonly
                />
            }
        </Link>
    )
}