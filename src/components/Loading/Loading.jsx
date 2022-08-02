import React from 'react'
import { Ripple } from 'react-spinners-css';
import './Loading.css'

export default function Loading() {
  return (
    <div className="loading">
      <h1 style={{ margin: '0'}}>Loading</h1>
      <Ripple color="#000000" size={40} />
    </div>
  )
}
