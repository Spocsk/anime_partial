import React from 'react';

export default function Video({src}) {

    return (
        <video width="150">
            <source src={src} type="video/mp4" />
        </video>
    );
}
