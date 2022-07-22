import * as React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import './Modal.css';

export default function Modal({ open, children, onClose }) {
  {/* The modal pop for user to update its delivery address and profile */}
  if (!open) return null;
  return (
    <>
      <div className="overlay">
        <div className="modal">
          <button className="back-btn" onClick={onClose}>
            <BiArrowBack size={21}/>
          </button>
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
