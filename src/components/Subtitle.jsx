import React from 'react'
import '../styles/Subtitle.css'

export default function Subtitle({size='16px', color='white', children, margin, className, onClick, bgColor}) {
  return (
      <p onClick={onClick} className={`subtitle ${className}`} style={{fontSize: size, color: color, margin: margin, backgroundColor: bgColor}}>
          {children}
      </p>
  );
}
