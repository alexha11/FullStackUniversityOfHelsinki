import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <div>
      <button onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [mostVote, setMostVote] = useState(0)

  const getSelected = () => {
    let x = Math.floor((Math.random() * 7))
    //console.log(selected)
    setSelected(x)
  }

  const updateVote = () => {
    //console.log(selected)
    let arr = [...vote]
    arr[selected] += 1
    
    let temp = 0
    let pos = 0
    for(let i = 0; i < arr.length; i++) {
      if (temp < arr[i]) {
        pos = i
        temp = arr[i]
      }
    }
    console.log(arr)
    setMostVote(pos)
    setVote(arr)
  }
  
  return (
    <div>
      <Header text={'Anecdote of the day'}/>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button handleClick={updateVote} text={'vote'}/>
      <Button handleClick={getSelected} text={'next anecdotes'}/>

      <Header text={'Anecdote with most votes'}/>
      {anecdotes[mostVote]}
      <p>has {vote[mostVote]} votes</p>
    </div>
  )
}

export default App