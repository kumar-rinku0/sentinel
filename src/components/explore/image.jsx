import React from 'react'

const Image = ({ image, imgWidth, imgHeight, imgObjFit }) => {
  const { url: imageUrl, fileName: imageName } = image;
  return (
    <div style={{ width: `${imgWidth}` }}>
      <img src={imageUrl} alt={imageName} style={{ width: `${imgWidth}`, height: `${imgHeight}`, objectFit: `${imgObjFit}` }} />
    </div>
  )
}

export default Image