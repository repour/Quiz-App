import { useState } from 'react'
import './Result.scss'
import PropTypes from 'prop-types'
import { useEffect } from 'react';

const Result = ({ onTryAgain, totalQuestions, result }) => {

    const [name, setName] = useState("");
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
      setHighScores(JSON.parse(localStorage.getItem("highScores")) || [])

    }, [])
    

    const handleSave = () => {
        const score = {
            name,
            score: result.score
        };

        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem("highScores", JSON.stringify(newHighScores));
    }

    const handleTryAgain = () => {
        setShowScores(false);
        setHighScores([]);
        onTryAgain();

    }

    return (
        <div className='result'>
            <h3>نتیجه</h3>
            <p>
                کل سوالات: <span>{totalQuestions}</span>
            </p>
            <p>
                امتیاز نهایی: <span>{result.score}</span>
            </p>
            <p>
                جواب‌های درست: <span>{result.correctAnswers}</span>
            </p>
            <p>
                جواب‌های غلط: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={handleTryAgain}>دوباره امتحان کن</button>
            {
                !showScores
                    ?
                    <>
                        <h3>
                            نام خود را وارد کنید <br /> تا امتیاز شما ذخیره شود!
                        </h3>
                        <input
                            placeholder='نام شما'
                            value={name}
                            onChange={(evt) => setName(evt.target.value)}
                        />
                        <button onClick={handleSave}>ذخیره</button>
                    </>
                    :
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>رتبه</th>
                                    <th>نام</th>
                                    <th>امتیاز</th>
                                </tr>
                            </thead>
                            <tbody>
                                {highScores.map((highScore, idx) => {
                                    if (idx < 5) {
                                        return (
                                            <tr key ={`${highScore.score}${highScore.name}${idx}`}>
                                                <td>{idx + 1}</td>
                                                <td>{highScore.name}</td>
                                                <td>{highScore.score}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </>
            }

        </div>
    )
}

Result.propTypes = {
    onTryAgain: PropTypes.func.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    result: PropTypes.object.isRequired
}

export default Result