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
  // const [answers, setAnswers] = React.useState()
  console.log("Component rendered")

  
  React.useEffect(() => {
    
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

    />)
  function handleSubmit(event){
    console.log(event.target.value)
  }
  
  return (
    <div className="app">
      <Header/>
      <br></br>
      <div className="questions-container">
        {questionsElement}
      </div>
      {/* <pre>{JSON.stringify(questions, null, 2)}</pre> */}
      <h2 className="submit" onClick={handleSubmit}>Submit</h2>
     
    </div>
  );
}

