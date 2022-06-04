import React from "react"
import Question from "./components/Question"

export default function Quiz(props) {
    
    const questionElements = props.quizData ? props.quizData.map(question => {
        return <Question 
                key={question.id}
                id={question.id}
                question={question.question}
                answers={question.all_answers}
                handleAnswerSelect={props.handleAnswerSelect}
                show={props.showAnswers}
                />
    }) : ""
    
    
    return (
        <div className="quiz">
        
            {props.loading ? <p className="loading">Loading...</p> : <> {questionElements}
            <div className="btn-container">
                {props.showAnswers && <p className="results-text">You scored {props.correctAnswers}/{props.quizData.length} correct answers</p>}
                <button className="submit-btn" onClick={props.handleToggleAnswers}>{props.showAnswers ? "Play again" : "Check answers"}</button>
            </div> </> }
            
            {props.warning && <p className="warning">Please answer all the questions</p> }
        </div>   
    )
}