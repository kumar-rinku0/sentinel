import React, { useState } from 'react'
import { useAuth } from "../../AuthProvider";
import axios from 'axios';
import { useMsg } from '../alert/alert-provider';
import { useNavigate } from "react-router";

const PostReview = ({ createdBy, id }) => {
  const { setAlert } = useMsg();
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
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

  // handler of deleting listing!
  const handleDeleteClick = (id, createdBy) => {
    axios.post(`api/listings/${id}/${createdBy}`).then((res) => {
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

  // handler of updating listing!
  const handleUpdateClick = (id) => {
    console.log(id);
  }

  if (isAuthenticated && user._id === createdBy) {
    return (
      <div className='btn-container'>
        <button className='btn' type="button" onClick={() => handleDeleteClick(id, createdBy)}>Delete Listing</button>
        <button className='btn' type="button" onClick={() => handleUpdateClick(id)}>Update Listing</button>
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