import React from 'react'
import Image from './image';
import TimeInAgo from './time-in-ago';
import { Link } from 'react-router';

const Card = ({ listing }) => {
  const { _id, title, image, description, location, createdAt } = listing;
  return (
    <div>
      <Link to={`/${_id}`}>
        <Image image={image} />
      </Link>
      <h4 style={{ margin: 0 }}>
        {title}
      </h4>
      <TimeInAgo createdAt={createdAt} />
    </div>
  )
}

export default Card