import React from 'react'
import '../styles/Text.css'

export default function Text({size='12px', color='white', children}) {
  return (
      <p className='text' style={{fontSize: size, color: color}}>
          {children}
      </p>
  );
}
