import React from 'react';
import '../styles/Button.css'

export default function Button({children, width, height, bgColor, onClick}) {

    const btnStyle = {
        padding: '1rem 2rem',
        margin: '1rem',
        width: width,
        height: height,
        backgroundColor: bgColor,
        color: 'white'
    }

    return (
        <div style={btnStyle} className="btn" onClick={onClick}>
            {children}
        </div>
    );
}
