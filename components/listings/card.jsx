import React from 'react'
import Image from './image';
import TimeInAgo from './time-in-ago';

const Card = ({ listing }) => {
  const { _id, title, image, description, location, createdAt } = listing;
  return (
    <div>
      <a href={`/api/listings/${_id}`}>
        <Image image={image} />
      </a>
      <h4 style={{ margin: 0 }}>
        {title}
      </h4>
      <TimeInAgo createdAt={createdAt} />
    </div>
  )
}

export default Card