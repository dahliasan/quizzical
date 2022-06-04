import React from "react"

export default function Question(props) {
    
    function generateClassList(answer) {
        if(props.show) {
            return `answer show ${answer.correct ? "correct" : answer.correct === null ? "" : "wrong"}`
        } else {
            return `answer ${answer.selected ? "selected" : ""}`
        }
    }    
    
    const answerElements = props.answers.map(answer => {
        return <div 
            key={answer.id} 
            className={generateClassList(answer)} 
            onClick={() => props.handleAnswerSelect(answer.id, props.id)}
            >{answer.answer}</div>
    })
    
    return (
        <>
            <div className="questions-container">
                <h3 className="question">{props.question}</h3>
                <div className="answers-container">
                    {answerElements}
                </div>
            </div>
            <hr />
        </>
    )
}