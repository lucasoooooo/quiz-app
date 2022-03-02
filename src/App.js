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

  // const [gameOver, setGameOver] = React.useState(false)
  const [answers, setAnswers] = React.useState(
    Array.from({length: questions.length}, () => null))
  
  React.useEffect(() => {
    // console.log(questions)
    localStorage.setItem("apiQuestions", JSON.stringify(questions))
  }, [])

  // function handleAnswer(event){
  //   setAnswers(event.target.value)
  // }

  // New Quiz
  // React.useEffect(()=>{
  //   async function getQuestions(){
  //     const res = await fetch("https://opentdb.com/api.php?amount=10&category=28")
  //     const data = await res.json()
  //     setQuestions(data.results)
  //   }
  //   getQuestions()  
  // } , [])

  const questionsElement = questions.map((q, index) =>
    <Questions
      number = {index}
      key = {index}
      question = {q.question}
      answers = {[q.correct_answer, ...q.incorrect_answers]}
      onChange = {(change) => handleAnswers(change.target.value, change.target.name)}
    />)
  function handleAnswers(ans, index){
    setAnswers(function(oldAnswer){
      return oldAnswer.map(function(o,i){
          if (i == index){
            return ans
          }
          else{
            return o
          }
        })
    })
  }

  function handleSubmit(event){
    // console.log(event.target.value)
    var numberRight = 0
    for (let i=0; i<answers.length; i++){
      // console.log("Checking Answer # ",answers[i])
      if (answers[i] == questions[i].correct_answer){
        numberRight+=1
      }
    }
    console.log("Number correct: ", numberRight)
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

      <h2 className="submit" onClick={handleSubmit}>Submit</h2>
     
    </div>
  );
}

