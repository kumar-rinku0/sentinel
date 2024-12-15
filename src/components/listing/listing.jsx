import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from '../explore/image';
import { useParams, useNavigate } from "react-router";
import Map from './map';
import PostReview from './post-review';



const handleUpdateClick = (id) => {
  console.log(id);
}

const Listing = () => {
  let { id } = useParams();
  const [accessToken, setAccessToken] = useState(null);
  const [listingCreator, setListingCreator] = useState(null);
  const [listing, setListing] = useState([]);
  const navigate = useNavigate();
  const { title, description, location, image, price, reviews, createdBy } = listing;
  console.log(location);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleDeleteClick = (id, createdBy) => {
    axios.post(`api/listings/${id}/${createdBy}`).then((res) => {
      console.log(res.data);
      const { msg, type } = res.data;
      setAlert([msg, type, true]);
      setTimeout(() => {
        navigate("/");
      }, 3200);
    }).catch((err) => {
      console.log(err.response.data);
      const { msg, type } = err.response.data;
    })
  }

  useEffect(() => {
    axios.get(`/api/listings/${id}`).then((res) => {
      console.log(res.data.listing);
      setListing(res.data.listing);
      setAccessToken(res.data.accessToken);
      setListingCreator(res.data.listingCreatedBy);
      setLoading(false);
    }).catch((err) => {
      const { msg, type } = err.response.data;
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
    );
    return;
  }, [])

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
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
        </div>
        <div className='map'>
          {/* <Map accessToken={accessToken} coordinates={location.geometry.coordinates} /> */}
          map
        </div>
      </div>
      <PostReview createdBy={createdBy} id={id} />
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