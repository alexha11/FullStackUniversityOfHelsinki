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
  export default Total;