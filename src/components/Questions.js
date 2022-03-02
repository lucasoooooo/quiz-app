import React from "react";

export default function Questions(props){
    const choices = props.answers.map(a =>
        <div key={props.number+a}>
            <label >{a}</label>
            <input type="radio" id={a} name={props.number} value={a}/>
        </div>
        )
        //Fixes wierd encoding problem, ex &#039; instead of '
    var test = props.question.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec);
    });

     test = test.replace(/&quot;/g, () =>"\"")
    
    // const test = props.question.replace(/&#(\d+);/g, function(match, dec) {
    //     return String.fromCharCode(dec);
    // });
    
    return (<div className="questions">
        <p> {`Question ${props.number+1}: ${test} `}</p>
        <div className="answers-container">
            <p>Answer:</p>
            
            {choices}
            
        </div>
        {/* <input type="text" id={props.number} name= {props.question}>Answers: </input> */}

        </div>)
}