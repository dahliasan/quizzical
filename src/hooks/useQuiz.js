import React from "react"
import he from "he"
import {nanoid} from "nanoid"

function useQuiz() {
        
    const [showQuiz, setShowQuiz] = React.useState(false)
    const [quizData, setQuizData] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [newQuiz, setNewQuiz] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [showWarning, setShowWarning] = React.useState(false)
    const [showAnswers, setShowAnswers] = React.useState(false)

    const QUIZ_LENGTH = 5

    // Fetch quiz data from API
    React.useEffect(() => {
        setLoading(true)
        fetch(`https://opentdb.com/api.php?amount=${QUIZ_LENGTH}`)
        .then(res => res.json())
        .then(data => {
            
            const newQuizData = data.results.map(question => {
                // Create array of all possible answers
                let answers = []
                if(question.type === "boolean") {
                    answers = ["True", "False"]
                } else {
                    answers = question.incorrect_answers.map(answer => he.decode(answer)) 
                    const randomNumber = Math.floor(Math.random() * (answers.length + 1))
                    // insert correct answer into a random position
                    answers.splice(randomNumber, 0, he.decode(question.correct_answer))
                }
                 
                // Generate an array of answer objects
                const answersArray = answers.map(answer => 
                    ({
                        id: nanoid(),
                        answer: answer,
                        selected: false,
                        correct: null
                    })
                ) // end answers array map
                
                return {
                        id: nanoid(),
                        ...question,
                        correct_answer: he.decode(question.correct_answer),
                        question: he.decode(question.question), 
                        all_answers: answersArray
                        }
            }) // end new quiz data .map
            setLoading(false)
            setQuizData(newQuizData)
            
        }) // end data function
    }, [newQuiz]) 

    function toggleShowQuiz() {
        setShowQuiz(prevShowState => !prevShowState)
    }
    
    
    function toggleAnswerSelect(id, questionId) {
        // console.log(`id = ${id}, questionId = ${questionId}`)
        setQuizData(prevQuiz => {
            return prevQuiz.map(question => {
              if(question.id === questionId) {
                  let newAnswers = question.all_answers.map(answer => {
                      return answer.id === id ?
                      {...answer, selected: true} :
                      {...answer, selected: false}
                  })
                  return {...question, all_answers: newAnswers}
              } else {
                  return question
              }
            })
        })
    }
    
    function checkAnswers() {
        const isComplete = quizData.map(question => {
            return question.all_answers.some(answer => answer.selected)
        }).every(question => question === true)
        
        if(isComplete) {
            setShowWarning(false)
            setShowAnswers(prevState => !prevState)
            setQuizData(prevQuiz => {
                return prevQuiz.map(question => {
                    let newAnswers = question.all_answers.map(answer => {
                        let isCorrect = answer.answer === question.correct_answer
                        answer.selected && isCorrect && setCorrectAnswers(prevNum => prevNum + 1)
                        return isCorrect ? {...answer, correct: true} :
                        answer.selected && !isCorrect ? {...answer, correct: false} : answer 
                    })
                return {...question, all_answers: newAnswers}
                }) // end prevQuiz.map
            }) // end setQuizData      
        } else {
            setShowWarning(true)
        }
    }
    
    
    function generateNewQuiz() {
        setNewQuiz(prevNum => prevNum + 1)
        setCorrectAnswers(0)
        setLoading(prevState => !prevState)
    }
    
    
    function toggleAnswers() {
        if(showAnswers) {
            // reset quiz
            setShowAnswers(prevState => !prevState)
            generateNewQuiz() // play again
            return 
        } else {
            checkAnswers()
        }
    }
    
    
    return {
        showQuiz, 
        toggleShowQuiz, 
        quizData, 
        toggleAnswerSelect, 
        toggleAnswers, 
        correctAnswers, 
        loading,
        showAnswers,
        showWarning
        }
}

export default useQuiz