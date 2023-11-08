const Filter = ({filterName, handleInputChange}) => {
    return (
        <form>
          <div>
            filter shown with
            <input value={filterName} onChange={handleInputChange} />
          </div>
        </form>
    )
  }


  export default Filter;