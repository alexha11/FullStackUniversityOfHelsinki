import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick ,text}) => <button onClick={handleClick}>{text}</button> 

const StatisticLine = ({text ,sta}) => {
  return (
      <tr>
        <td> {text} </td>
        <td> {sta} </td>
      </tr>
   
  )
}

const Statistics = ({good, bad, neutral}) => {
  const allFeedback = good + bad + neutral
  const aveScore = (good - bad)/allFeedback
  const perPositiveFeed = (good)/allFeedback
  if (allFeedback == 0) {
    return(
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  else {
    return(
      <div>
        <StatisticLine text='good' sta={good}/>
        <StatisticLine text='neutral' sta={neutral}/>
        <StatisticLine text='bad' sta={bad}/>
        <StatisticLine text='all' sta={allFeedback}/>
        <StatisticLine text='average' sta={aveScore}/>
        <StatisticLine text='positive' sta={perPositiveFeed}/>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setFeedBack] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setFeedBack(allFeedback + 1)
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setFeedBack(allFeedback + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
    setFeedBack(allFeedback + 1)
  }

 

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handleClickGood} text={'good'}/>
      <Button handleClick={handleClickNeutral} text={'neutral'}/>
      <Button handleClick={handleClickBad} text={'bad'}/>

      
      <Header text='statistics'/>
      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App