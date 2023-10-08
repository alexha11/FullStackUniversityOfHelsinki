import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({courses}) => {
    return(
      <>
      {courses.map(course => (
          <>
            <Header header={course.name}/>
            <Content content={course.parts}/>
            <Total parts={course.parts}/>
          </>
        ))} 
      </>
    )
  }

  export default Course;