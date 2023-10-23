import PropTypes from 'prop-types';
import { useState } from 'react';
import { resultInitalState } from '../../constant';

const Quiz = ({ questions }) => {

    const [currentQuestion, setCrrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitalState);
    const [showResult, setShowResult] = useState(false);


    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    }
    const onClickNext = () => {
        setAnswerIdx(null);
        setResult((prev)=>
            answer
            ?
            {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers +1
            }
            :
            {
                ...prev,
                wrongAnswers: prev.wrongAnswers +1
            }
        )
        if (currentQuestion !== questions.length -1) {
            setCrrentQuestion((prev) => prev + 1)
        } else {
            setCrrentQuestion(0)
            setShowResult(true)
        }
    }
    const onTryAgain =() =>{
        setResult(resultInitalState)
        setShowResult(false)
    }
    return (
        <div className="quiz-container">
            {
            !showResult 
            ? 
            (
                <>
            <span className='active-question-no'>{currentQuestion + 1}</span>
            <span className='total-question'>/{questions.length}</span>
            <h2>{question}</h2>
            <ul>
                {
                    choices.map((answer, idx) => (
                        <li
                            key={answer}
                            onClick={() => onAnswerClick(answer, idx)}
                            className={answerIdx === idx ? 'selected-answer' : null}
                        >
                            {answer}
                        </li>
                    ))
                }
            </ul>
            <div className="footer">
                <button onClick={onClickNext} disabled={answerIdx === null} >
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
            </>) 
            :
            <div className='result'>
                <h3>Result</h3>
                <p>
                    Total Questions: <span>{questions.length}</span>
                </p>
                <p>
                    Total Score: <span>{result.score}</span>
                </p>
                <p>
                    Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                    Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>
                <button onClick={onTryAgain}>Try again</button>
            </div> 
            }

        </div>
    )
}


Quiz.propTypes = {
    questions: PropTypes.array.isRequired
}

export default Quiz