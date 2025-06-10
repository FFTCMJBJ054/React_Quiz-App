import React, { useState } from 'react';
import Results from './results';

function Quiz(){

    const questionBank = [
        {
            question: "What is the capital of Nigeria?",
            options: ["Kano", "Lagos", "Abuja", "Yenagoa"],
            answer: "Abuja"
        },

        {
            question: "What is the capital of Italy?",
            options: ["Kano", "Milan", "Abuja", "Rome"],
            answer: "Rome"
        },

        {
            question: "What is the capital of England?",
            options: ["London", "Lagos", "Abuja", "Yenagoa"],
            answer: "London"
        }
    ]

    const defaultAnswers = [null, null, null]
    
    const [selectedOption, setSelectedOption] = useState(defaultAnswers)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isQuizFinished, setIsQuizFinished] = useState(false)

    function handleOptionClick(option){
        const userAnswers = [...selectedOption]
        userAnswers[currentQuestionIndex] = option
        setSelectedOption(userAnswers);
    }

    function handleNextQuestion(){
        if (currentQuestionIndex < questionBank.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        else{
            setIsQuizFinished(true)
        }
    }

    function handlePrevQuestion(){
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }

    function restartQuiz(){
        setSelectedOption(defaultAnswers)
        setCurrentQuestionIndex(0)
        setIsQuizFinished(false)
    }

    if (isQuizFinished) {
       return (
            <Results 
                userAnswers={selectedOption}
                questionBank={questionBank}
                restartQuiz={restartQuiz}
            />
        )
    }

    return(
        <div>
            <h2>Question {currentQuestionIndex + 1 }</h2>
            <p>{questionBank[currentQuestionIndex].question}</p>
            {questionBank[currentQuestionIndex].options.map((option, index) => {
                return (
                    <button key={index} className={"option" + (selectedOption[currentQuestionIndex] === option ? " selected" : "")} onClick={() => handleOptionClick(option)}>{option}</button>
                )
            })} 

            <div className="nav-buttons">
                <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                <button onClick={handleNextQuestion}>
                    {currentQuestionIndex === questionBank.length -1 ? "Finish Quiz" : "Next"}
                </button>
            </div>
        </div>
    ) 
    
}

export default Quiz