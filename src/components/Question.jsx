import QuestionTimer from "./QuestionTimer";
import Answers from "./Aswers";
import { useState } from "react";

export default function Question({questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}){
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    function handleSelectAnswer(answer){
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(()=>{
            setAnswer({
                selectedAnswer: answer,
                isCorrect: true
            })

        }, 1000);
    }

    return (
        
            <div id="question">
                <QuestionTimer  timeout={10000} onTimeOut={onSkipAnswer}/>
                <h2>{questionText}</h2>
                <Answers
                  
                    answers={answers} 
                    answerState={answerState} 
                    selectedAnswer={selectedAnswer}
                    onSelect={onSelectAnswer}
                   
                    />

            </div>
        

        
    );
}