import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from '../explore/image';
import { useMsg } from '../alert/alert-provider';
import { useParams, useNavigate } from "react-router";
import Map from './map';
import PostReview from './post-review';
import { Skeleton } from '@mui/material';


const Listing = () => {
  const { setAlert } = useMsg();
  let { id } = useParams();
  const [accessToken, setAccessToken] = useState(null);
  const [listingCreator, setListingCreator] = useState(null);
  const [listing, setListing] = useState([]);
  const navigate = useNavigate();
  const { title, description, location, image, price, reviews, createdBy } = listing;
  console.log(location);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get(`/api/listings/${id}`).then((res) => {
      console.log(res.data.listing);
      setListing(res.data.listing);
      setAccessToken(res.data.accessToken);
      setListingCreator(res.data.listingCreatedBy);
      setLoading(false);
    }).catch((err) => {
      const { msg, type } = err.response.data;
      setAlert([msg, type, true]);
      navigate("/");
    }
    );
    return;
  }, [])

  if (loading) {
    return (
      <div className='listing'>
        <div>
          loading...
        </div>
      </div>
    )
  }
  return (
    <div className='listing'>
      <div className='content-map-container'>
        <div className='content'>
          <h4>{title}</h4>
          <div className='img'>
            <img src={image.url} alt={image.filename} />
          </div>
          <div>{description}</div>
          <div> &#8377; {price.toLocaleString()}</div>
          <div>{location.value + ", " + location.country}</div>
          <PostReview createdBy={createdBy} id={id} />
        </div>
        <div className='map'>
          <Map accessToken={accessToken} coordinates={location.geometry.coordinates} />
        </div>
      </div>
      <div className='reviews-container'>
        {reviews.map(({ username, msg, rating }) => {
          return (
            <div className='review' key={username}>
              <h5 className='margin-0'>{username}</h5>
              <div> {rating} </div>
              <div className='text-sm'> {msg} </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Listing;