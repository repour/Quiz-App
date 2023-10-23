import './App.css'
import Quiz from './components/Quiz/Quiz'
import {jsQuizz} from './constant.js'
function App() {

  return (
    <>
      <Quiz questions={jsQuizz.questions}/>
    </>
  )
}

export default App
