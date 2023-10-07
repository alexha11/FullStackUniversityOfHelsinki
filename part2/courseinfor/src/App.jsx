const Header = ({header}) => <h1>{header}</h1>

const Content = ({content}) => {
  const Part = ({text, number}) => <p>{text} {number}</p>
  //console.log(content[0].exercises)
  return (
    <div>
      {content.map((part) => (<Part text={part.name} number={part.exercises}/>))}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  console.log(total)
  return(
    <div>
      <b>
        total of {total} exercises
      </b>
    </div>
  )
}

const Course = ({course}) => {
  return(
    <>
    <Header header={course.name}/>
    <Content content={course.parts}/>
    <Total parts={course.parts}/>
    </>
    )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App