import React from 'react'
import pic from '../../../public/notfound.png'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <img src={pic} width="500px"/>
      <h1 style={{fontSize: '5em', textAlign: 'center'}}>Huh. Look like you're looking for some bad food right?</h1>
    </div>
  )
}
