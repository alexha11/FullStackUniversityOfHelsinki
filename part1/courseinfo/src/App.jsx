const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.data1} {props.data2}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <Part data1 = {props.part1} data2 = {props.exercise1}/>
      </p>
      <p>
        <Part data1 = {props.part2} data2 = {props.exercise2}/>
      </p>
      <p>
        <Part data1 = {props.part3} data2 = {props.exercise3}/>
      </p>
    </div>
  )
}

const Total = (st) => {
  return (
    <div>
      <p>
        Number of exercises {st.totalExercise}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const contents = [
    {part: 'Fundamentals of React', exercise: 10},
    {part: 'Using props to pass data', exercise: 7},
    {part: 'State of a component', exercise: 14}
  ]
  const totalExercise = contents[0].exercise + contents[1].exercise + contents[2].exercise
  console.log(totalExercise)
  return (
    <div>
      <Header course={course} />
      <Content part1={contents[0].part} part2={contents[1].part} part3={contents[2].part} 
      exercise1={contents[0].exercise} exercise2={contents[1].exercise} exercise3={contents[2].exercise} />
      <Total totalExercise={totalExercise} />
    </div>
  )
}

export default App