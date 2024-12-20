import React, { useState } from 'react'
import { useAuth } from "../../AuthProvider";
import axios from 'axios';
import { useMsg } from '../alert/alert-provider';
import { Link, useNavigate } from "react-router";
import RatingComp from '../forms/ratting';

const PostReview = ({ createdBy, id, setListing }) => {
  const { setAlert } = useMsg();
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [inputs, setInputs] = useState({});
  const renderReviewForm = () => {
    setIsVisible((prevState) => !prevState);
  }
  // handler of changes in inputs
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  // handler of form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    const formData = new FormData(e.target);
    const review = Object.fromEntries(formData);
    axios.post(`/api/review/${id}`, review).then((res) => {
      console.log(res.data);
      const { msg, type, listing } = res.data;
      setAlert([msg, type, true]);
      setDisableBtn(false);
      setListing((prev) => ({ ...prev, reviews: listing.reviews }));
      setInputs("");
      setIsVisible(false);
    }).catch((err) => {
      console.error(err.response.data);
      const { msg, type } = err.response.data;
      setAlert([msg, type, true]);
      setDisableBtn(false);
    })
  }

  // handler of deleting listing!
  const handleDeleteClick = (id, createdBy) => {
    axios.post(`/api/listings/${id}/${createdBy}`).then((res) => {
      console.log(res.data);
      const { msg, type } = res.data;
      setAlert([msg, type, true]);
      navigate("/");
    }).catch((err) => {
      console.log(err.response.data);
      const { msg, type } = err.response.data;
      setAlert([msg, type, true]);
    })
  }


  if (isAuthenticated && user._id === createdBy) {
    return (
      <div className='post-review'>
        <button className='btn' type="button" onClick={() => handleDeleteClick(id, createdBy)}>Delete Listing</button>
        <Link to={`/listing/${id}/edit`} >Update Listing</Link>
      </div>
    )
  }
  if (isVisible) {
    return (
      <div className='post-review'>
        <form onSubmit={handleSubmit} className='post-review-form'>
          <div className='div1'>
            <RatingComp />
            <input type="text" name="msg" id="msg" placeholder='msg' onChange={handleChange} value={inputs.msg || ''} />
          </div>
          <div className='div2'>
            <button type='button' onClick={renderReviewForm}>cencel</button>
            <button type='submit' disabled={disableBtn}>save</button>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div className='post-review'>
      <button className='btn' type="button" onClick={renderReviewForm}>Post Review!</button>
    </div>
  )
}

export default PostReview;