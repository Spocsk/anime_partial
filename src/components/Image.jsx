import React from 'react'
import '../styles/Image.css'

export default function Image({src, width, height}) {
  return (
    <img 
        src={src} 
        alt='img' 
        className='image'
        height={height}
        width={width}
    />
  );
}
