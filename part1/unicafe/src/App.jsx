import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick ,text}) => <button onClick={handleClick}>{text}</button> 

const Statistics = ({text ,sta}) => <p>{text} {sta}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handleClickGood} text={'good'}/>
      <Button handleClick={handleClickNeutral} text={'neutral'}/>
      <Button handleClick={handleClickBad} text={'bad'}/>


      <Header text='statistics'/>
      <Statistics text='good' sta={good}/>
      <Statistics text='neutral' sta={neutral}/>
      <Statistics text='bad' sta={bad}/>


    </div>
  )
}

export default App