import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from '../explore/image';
import { useParams } from "react-router";

const Listing = () => {
  let { id } = useParams();
  console.log(id);
  const [listing, setListing] = useState([]);
  const { title, description, image, price } = listing;
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    axios.get(`/api/listings/${id}`).then((res) => {
      console.log(res.data.listing);
      setListing(res.data.listing);
      setLoading(false);
    }).catch((err) => {
      console.log(err)
      setLoading(false);
    }
    );
    return;
  }, [])
  return (
    <div>
      {loading && (<div>Loading...</div>)}
      {!loading && (
        <div>
          <div>{title}</div>
          <Image image={image} />
          <div>{description}</div>
          <div>{price}</div>
        </div>
      )}
    </div>
  )
}

export default Listing;