import React from 'react';
import '../App.css';

const Die = (props) => {
    const value = props.value

    return (
        <div className="dice-face">
            <h2 className="dice-num">{value}</h2>
        </div>
    )
}

export default Die