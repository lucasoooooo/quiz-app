import React from "react";

export default function Questions(props){
    const choices = props.answers.map(function(a){
        //Fix encoding problems
        var newAnswers = a.replace(/&#(\d+);/g, (match, dec) => {
            return String.fromCharCode(dec)});
        newAnswers = newAnswers.replace(/&amp;/g, () =>"&")
        newAnswers = newAnswers.replace(/&quot;/g, () =>"\"")
        return(
        <div key={props.number+a}>
            <label >{newAnswers}</label>
            <input onChange={props.onChange} type="radio" id={newAnswers} name={props.number} value={newAnswers}/>
        </div>)
    }) 
       
        //Fixes wierd encoding problem, ex &#039; instead of '
    var newQuestion = props.question.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec)});
    newQuestion = newQuestion.replace(/&quot;/g, () =>"\"")
    newQuestion = newQuestion.replace(/&amp;/g, () =>"&")
    
    
    return (<div className="questions">
        <p> {`Question ${props.number+1}: ${newQuestion} `}</p>
        <div className="answers-container">
            <p>Answer:</p>
            
            {choices}
            
        </div>
        {/* <input type="text" id={props.number} name= {props.question}>Answers: </input> */}

        </div>)
}