import React from "react"
import Questions from "./components/Questions"
import Header from "./components/Header"


export default function App() {
  //API CALL
  //https://opentdb.com/api.php?amount=10&category=28&difficulty=hard&type=multiple
  //                                 # of Questions       easy/medium/hard   TrueorFalse/multiple choise

  //App requirements
  //1. Two screens, Start and quesitons
  //2. Tally correct answers with "Check Answers" Button
  //3. Play again 
  const [questions, setQuestions] = React.useState(JSON.parse(localStorage.getItem("apiQuestions"))||{})
  const [choices, setChoices] = React.useState(
    Array.from({length: questions.length}, () => ["null"]))
  const [answers, setAnswers] = React.useState(
    Array.from({length: questions.length}, () => null))
  const [score, setScore] = React.useState(null)


  React.useEffect(() => {
    localStorage.setItem("apiQuestions", JSON.stringify(questions))
    var arr =[]
    for (let i=0; i<questions.length; i++){
      arr.push(shuffleAnswers(
        [questions[i].correct_answer, ...questions[i].incorrect_answers]))  
    }
    setChoices(arr)
  }, [questions])
  
  const questionsElement =
   questions.map((q, index) =>
    <Questions
      number = {index}
      key = {index}
      question = {q.question}
      answers = {choices[index]}//shuffleAnswers([q.correct_answer, ...q.incorrect_answers])}
      onChange = {(change) => handleAnswers(change.target.value, change.target.name)}
    />)
  //Randomizes order of answers
  function shuffleAnswers(arr){
    let currentIndex = arr.length
    let randomIndex
    while (currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]]
    }
    return arr
}

  function handleAnswers(ans, index){
    setAnswers(function(oldAnswer){
      return oldAnswer.map(function(o,i){
          if (index == parseInt(i)){
            return ans
          }
          else{
            return o
          }
        })
    })
  }

  function handleSubmit(){
    var numberRight = 0
    for (let i=0; i<answers.length; i++){
      if (answers[i] === questions[i].correct_answer){
        numberRight+=1
      }
      console.log(`Question ${i+1} was ${questions[i].correct_answer}, you answered ${answers[i]}`)
    }
    setScore(numberRight)
  }

  function handleNewQuiz(){
    async function getQuestions(){
      const res = await fetch("https://opentdb.com/api.php?amount=10&category=28")
      const data = await res.json()
      setQuestions(data.results)
    }
    getQuestions()
    localStorage.setItem("apiQuestions", JSON.stringify(questions))
    var arr =[]
    for (let i=0; i<questions.length; i++){
      arr.push(shuffleAnswers(
        [questions[i].correct_answer, ...questions[i].incorrect_answers]))  
    }
    setChoices(arr)
  }
  
  return (
    <div className="app">
      <Header/>
      <br></br>
      <form onSubmit={handleSubmit}>
      <div className="questions-container">
        {questionsElement}
      </div>
 
      </form>
      <div className="Footer">
        <h2 className="submit" onClick={handleSubmit}>Check Answers</h2>
        {score!=null && <h2 className="score">{`Score: ${score}/${questions.length}`}</h2>}
        <h2 className="new-quiz" onClick={handleNewQuiz}>New Quiz</h2>
      </div>
    </div>
  );
}

