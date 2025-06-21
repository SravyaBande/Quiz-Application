import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import qbank from './components/questionbank';
import './App.css';
import Question from './components/Question';
import Score from './components/Score';
const App=()=>{
  const[currentQuestion,setCurrentQuestion]=useState(0);
  const[selectedOption,setSelectedOption]=useState("");
  const[score,setScore]=useState(0);
  const[quizEnd,setQuizEnd]=useState(false);

  const handleOptionChange=(e)=>{
    setSelectedOption(e.target.value);
  };
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    checkAnswer();
    handleNextQuestion();
  };
  const checkAnswer=()=>{
    if(selectedOption=== qbank[currentQuestion].answer){
      setScore((PrevScore)=>PrevScore+1);
    }
  };
  const handleNextQuestion=()=>{
    if(currentQuestion+1 <qbank.length){
      setCurrentQuestion(currentQuestion+1);
      setSelectedOption(" ");
    }else{
      setQuizEnd(true);
    }
  };

  return(
     <div className="App d-flex flex-column align-items-center justify-content-center">
            <h1 className="App-title">QUIZ APP</h1>
            
              {!quizEnd ?(
                <Question
                 question={ qbank[currentQuestion]}
                 selectedOption={selectedOption}
                 onOptionChange={handleOptionChange}
                 onSubmit={handleFormSubmit}
                />):(
                <Score
                 score={score}
                 onNextQuestion={handleNextQuestion}
                 className="score"
                  
                />
              )}
     </div>

  );
};

export default App;
