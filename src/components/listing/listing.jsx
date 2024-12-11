import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from '../explore/image';
import { useParams, useNavigate } from "react-router";
import AlertMsg from '../alert/alert-msg';

const Listing = () => {
  let { id } = useParams();
  console.log(id);
  const [listing, setListing] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { title, description, location, image, price } = listing;
  console.log(location);
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    axios.get(`/api/listings/${id}`).then((res) => {
      console.log(res.data.listing);
      setListing(res.data.listing);
      setLoading(false);
    }).catch((err) => {
      const { msg, type } = err.response.data;
      setLoading(false);
      setAlert([msg, type, true]);
      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
    );
    return;
  }, [])
  return (
    <div>
      {loading && (<div>Loading...</div>)}
      {!loading && alert && (
        <AlertMsg alert={alert} setAlert={setAlert} />
      )}
      {!loading && !alert && (
        <div>
          <div>{title}</div>
          <Image image={image} imgWidth="50rem" imgHeight="auto" />
          <div>{description}</div>
          <div>{price}</div>
          <div>{location.value + ", " + location.country}</div>
        </div>
      )}
    </div>
  )
}

export default Listing;