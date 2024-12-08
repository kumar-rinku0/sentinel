import React from 'react'

const Image = ({ image }) => {
  const { url: imageUrl, fileName: imageName } = image;
  return (
    <div style={{ width: "20rem" }}>
      <img src={imageUrl} alt={imageName} style={{ width: "20rem", height: "15rem", objectFit: "cover" }} />
    </div>
  )
}

export default Image