import { ImageGravity } from 'appwrite'
import React from 'react'

function Logo({width='100px'}) {
    return (
        <img
        src="/logo.png"
        alt="logo"
        style={{width:width}}
        />
    )
}

export default Logo
