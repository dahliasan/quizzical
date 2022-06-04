import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start--title">Quizzical</h1>
            <p className="start--desc">How good are you at trivia?</p>
            <button className="start--btn" onClick={props.handleStartClick}>Start quiz</button>
        </div>
    )
}