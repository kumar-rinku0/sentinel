import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './card';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    axios.get("/api/listings").then((res) => {
      console.log(res.data.listings);
      setListings(res.data.listings);
      if (res.data.user) {
        setUser(res.data.user);
      }
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
      {loading ? ( // Conditionally render based on loading state
        <div>Loading listings...</div>
      ) : (
        <>
          <div>
            Listing Count: {listings.length}
          </div>
          <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
            {Array.isArray(listings) && listings.length > 0 && listings.map((listing, idx) => (
              <div key={idx}>
                <Card listing={listing} />
              </div>
            ))}
            {Array.isArray(listings) && listings.length === 0 && (
              <div>No listings found.</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Listings