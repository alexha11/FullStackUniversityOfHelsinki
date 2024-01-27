import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        console.log(state)
        if (state.filterInput === '') {
            return state.anec
        }
        const test = state.anec.filter((anec) =>
        anec.content.toLowerCase().includes(state.filterInput));
        console.log(test)
        return test
        //person.name.toLowerCase().includes(filterName.toLowerCase())
    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
      }
    console.log(anecdotes.filterInput)
    return (
    <div>
      {anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList