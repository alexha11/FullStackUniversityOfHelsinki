
const Content = ({content}) => {
    const Part = ({text, number}) => <p>{text} {number}</p>
    //console.log(content[0].exercises)
    return (
      <div>
        {content.map((part) => (<Part text={part.name} number={part.exercises}/>))}
      </div>
    )
  }
export default Content;  