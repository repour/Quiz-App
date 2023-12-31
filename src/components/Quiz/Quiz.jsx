import PropTypes from 'prop-types';
import { useState } from 'react';
import { resultInitalState } from '../../constant';
import './Quiz.scss'
import AnswerTimer from '../AnswerTimer/AnswerTimer';
import Result from '../Result/Result';

const Quiz = ({ questions }) => {

    const [currentQuestion, setCrrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitalState);
    const [showResult, setShowResult] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true);
    const [inputAnswer, setInputAnswer] = useState('');
    const { question, choices, correctAnswer, type } = questions[currentQuestion];
    const [startQuiz, setStartQuiz] = useState(false);

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    }
    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null);
        setShowAnswerTimer(false);
        setInputAnswer('');
        setResult((prev) =>
            finalAnswer
                ?
                {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1
                }
                :
                {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1
                }
        )
        if (currentQuestion !== questions.length - 1) {
            setCrrentQuestion((prev) => prev + 1)
        } else {
            setCrrentQuestion(0)
            setShowResult(true)
        }

        setTimeout(() => {
            setShowAnswerTimer(true)
        })
    }
    const onTryAgain = () => {
        setResult(resultInitalState)
        setShowResult(false)
        setStartQuiz(false)
    }

    const handleTimeUp = () => {
        setAnswer(false);
        onClickNext(false)
    }

    const handleChange = (evt) => {
        setInputAnswer(evt.target.value);

        if (evt.target.value.toLowerCase() === correctAnswer.toLowerCase()) {
            setAnswer(true);
        } else {
            setAnswer(false)
        }
    }

    const getAnswerUI = () => {

        if (type === 'FIB') {
            return <input value={inputAnswer} onChange={handleChange} />;
        }

        return (
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
        )
    }

    return (
        <div className="quiz-container">
            {
                !showResult
                    ?
                    (
                        !startQuiz
                        ?
                        (<div className='start'>
                        <h3>کوییز اطلاعات عمومی</h3>
                        <button onClick={() => setStartQuiz(true)}>شروع</button>
                        </div>)
                        :
                        (<>
                            {showAnswerTimer && (
                                <AnswerTimer duration={100} onTimeUp={handleTimeUp} />
                            )}
                            <span className='active-question-no'>{currentQuestion + 1}</span>
                            <span className='total-question'>/{questions.length}</span>
                            <h2>{question}</h2>
                            {getAnswerUI()}
                            <div className="footer">
                                <button onClick={() => { onClickNext(answer) }} disabled={answerIdx === null && !inputAnswer} >
                                    {currentQuestion === questions.length - 1 ? "پایان" : "بعدی"}
                                </button>
                            </div>
                        </>)
                    )
                    :
                    <Result totalQuestions={questions.length} result={result} onTryAgain={onTryAgain} />
            }

        </div>
    )
}


Quiz.propTypes = {
    questions: PropTypes.array.isRequired
}

export default Quiz