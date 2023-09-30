const Header = (props) => {
  console.log(props.course)
  return (
    <div>
      <h1>
        {props.course.name}
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
        <Part data1 = {props.contents.parts[0].name} data2 = {props.contents.parts[0].exercises}/>
      </p>
      <p>
        <Part data1 = {props.contents.parts[1].name} data2 = {props.contents.parts[1].exercises}/>
      </p>
      <p>
        <Part data1 = {props.contents.parts[2].name} data2 = {props.contents.parts[2].exercises}/>
      </p>
    </div>
  )
}

const Total = (props) => {
  const numberOfExercise = props.contents.parts[0].exercises + props.contents.parts[1].exercises + props.contents.parts[2].exercises
  return (
    <div>
      <p>
        Number of exercises {numberOfExercise}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content contents={course} />
      <Total contents={course} />
    </div>
  )
}

export default App