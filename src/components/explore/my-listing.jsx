import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../AuthProvider';

import Skeleton from '@mui/material/Skeleton';
import Card from './card';

const MyListing = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`/api/listings/user/${user.username}`).then((res) => {
        console.log(res.data);
        setListings(res.data.listings);
        setLoading(false);
      }).catch((err) => {
        console.error(err.response.data);
      })
    }
  }, [isAuthenticated])
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
            {Array.isArray(listings) && listings.length > 0 && listings.map((listing) => (
              <div key={listing._id}>
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

export default MyListing;