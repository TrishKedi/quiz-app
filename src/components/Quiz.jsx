import {useState, useCallback, useRef} from "react";
import QUESTIONS from "../questions";
import quizComplete from "../assets/quiz-complete.png"
import Question from "./Question";



export default function  Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length -1;
    console.log('active index')
    console.log(activeQuestionIndex)
    const currentQuestion = QUESTIONS[activeQuestionIndex];

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [ ...prevUserAnswers, selectedAnswer]
        });

        setTimeout(() => {

            if(selectedAnswer === currentQuestion.answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout(()=>{
                setAnswerState('');
            }, 2000)
        }, 1000)
    }, [activeQuestionIndex]) 

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer] )

    if (quizIsComplete) {

        return (
            <div id="summary">
                <img src={quizComplete} alt="trophy"/>
            </div>

        )
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={currentQuestion.text}
                answers={ currentQuestion.answers}
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}