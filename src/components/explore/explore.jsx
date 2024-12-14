import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import "./explore.css";
import Card from './card';

const Explore = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    axios.get("/api/listings").then((res) => {
      console.log(res.data);
      setListings(res.data.listings);
      setLoading(false);
    }).catch((err) => {
      console.log(err)
      setLoading(false);
    }
    );
    return;
  }, [setListings, setLoading])

  return (
    <div>
      {loading ? ( // Conditionally render based on loading state
        <div className='explore'>
          <div className='explore-card-container'>
            <Skeleton variant="rounded" width="20rem" height="15rem" />
            <Skeleton variant="rounded" width="20rem" height="15rem" />
            <Skeleton variant="rounded" width="20rem" height="15rem" />
            <Skeleton variant="rounded" width="20rem" height="15rem" />
            <Skeleton variant="rounded" width="20rem" height="15rem" />
            {/* <Skeleton variant="rounded" width="20rem" height="15rem" /> */}
          </div>
        </div>
      ) : (
        <div className='explore'>
          <div>
            Listing Count: {listings.length}
          </div>
          <div className="explore-card-container">
            {Array.isArray(listings) && listings.length > 0 && listings.map((listing, idx) => (
              <div key={idx}>
                <Card listing={listing} />
              </div>
            ))}
            {Array.isArray(listings) && listings.length === 0 && (
              <div>No listings found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Explore;