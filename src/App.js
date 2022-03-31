import React, { useRef } from "react"

function App() {
  const [typing, setTyping] = React.useState("")
  const [timeRemaining, setTimeRemaining] = React.useState(5)
  const [isActive, setIsActive] = React.useState(false)
  const [words, setWords] = React.useState(0)
  const textRef = useRef(null)
  

  function handleChange(e){
    const {value}= e.target
    setTyping(value)
  }

  function wordCount(typing){
  const  wordsArr = typing.trim().split(" ")
  return wordsArr.filter(word => word !== "").length
  }

  function startGame(){
    setIsActive(true)
    setTimeRemaining(5)
    setTyping("")
    textRef.current.disabled = false
    textRef.current.focus()
  }

  function endGame(){
    setIsActive(false)
    setWords(wordCount(typing))
  }

  React.useEffect(() =>{
  if(isActive && timeRemaining > 0){
     setTimeout(() => {
       setTimeRemaining(time => time -1)
     }, 1000)
  } else if(timeRemaining === 0){
   endGame()
  }}, [timeRemaining, isActive])
  
  return (
    <div className="main">
      <h1>How fast do you type?</h1>
      <textarea
       value={typing}
       onChange={handleChange}
       disabled={!isActive}
       ref={textRef}
       />
      <div className="bottom-headings">
      <h1>Time remaining:{timeRemaining} </h1>
      <h1>Words count:{words}</h1>
      </div>
      <button 
      className="btn"
      disabled={isActive}
      // onClick={() => console.log(wordCount(typing))}
      onClick={startGame}>Start Game</button>
    </div>
  );
}

export default App;
