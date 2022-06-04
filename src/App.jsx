import React from "react"
import Start from "./Start"
import Quiz from "./Quiz"
import useQuiz from "./hooks/useQuiz"

export default function App() {
    const {
        showQuiz, 
        toggleShowQuiz, 
        quizData, 
        toggleAnswerSelect, 
        toggleAnswers, 
        correctAnswers, 
        loading,
        showAnswers,
        showWarning
        } = useQuiz()
    
    // console.log(quizData)
    
    return (
        <main className="main">
        {showQuiz
            ? <Quiz 
                handleStartClick={toggleShowQuiz} 
                quizData={quizData}
                handleAnswerSelect={toggleAnswerSelect}
                handleToggleAnswers={toggleAnswers}
                correctAnswers={correctAnswers}
                loading={loading}
                warning={showWarning}
                showAnswers={showAnswers} />
            : <Start handleStartClick={toggleShowQuiz} /> }
        </main>
    )
}