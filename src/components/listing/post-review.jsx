import React, { useState } from 'react'
import { useAuth } from "../../AuthProvider";
import axios from 'axios';
import { useMsg } from '../alert/alert-provider';

const PostReview = ({ createdBy, id }) => {
  const { setAlert } = useMsg();
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [inputs, setInputs] = useState({});
  const renderReviewForm = () => {
    setIsVisible((prevState) => !prevState);
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const review = Object.fromEntries(formData);
    axios.post(`api/listings/${id}`, review).then((res) => {
      console.log(res.data);
      const { msg, type } = res.data;
      setAlert([msg, type, true]);
    }).catch((err) => {
      console.error(err.response.data);
      const { msg, type } = err.response.data;
      setAlert([msg, type, true]);
    })
  }
  if (isAuthenticated && user._id === createdBy) {
    return (
      <div className='btn-container'>
        <button className='btn' type="button" onClick={() => handleDeleteClick(listing._id, createdBy)}>Delete Listing</button>
        <button className='btn' type="button" onClick={() => handleUpdateClick(listing._id)}>Update Listing</button>
      </div>
    )
  }
  if (isVisible) {
    return (
      <div className='btn-container'>
        <form onSubmit={handleSubmit}>
          <input type="number" name="rating" id="rating" onChange={handleChange} value={inputs.rating || ''} />
          <input type="text" name="msg" id="msg" onChange={handleChange} value={inputs.msg || ''} />
          <button type='button' onClick={renderReviewForm}>cencel</button>
          <button type='submit'>save</button>
        </form>
      </div>
    )
  }
  return (
    <div className='btn-container'>
      <button className='btn' type="button" onClick={renderReviewForm}>Post Review!</button>
    </div>
  )
}

export default PostReview;