import * as React from 'react';
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin} from 'react-icons/bs';
import './Footer.css';

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="containers">
        <div className="about-us">
          <h1 className="head">About Us</h1>
          <p className="pg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div className="social-media">
          <h1 className="head">Social Media</h1>
          <div className="icons">
            <BsFacebook size="30px"/>
            <BsTwitter size="30px"/>
            <BsInstagram size="30px"/>
            <BsLinkedin size="30px"/>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2022 The Foodie Express, Inc. All rights reserved.</p>
      </div>
    </div>
  )
}