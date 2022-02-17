import React from 'react'
import '../styles/Title.css'

export default function Title({size='50px', color='white', children, margin}) {
  return (
      <p style={{fontSize: size, color: color, fontWeight: 'bold', margin:margin}}>
          {children}
      </p>
  );
}
