import { useSelector, useDispatch } from 'react-redux'
import { addAnec, addVote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const addAnect = (event) => {
    event.preventDefault()
    const content = event.target.newContent.value
    console.log(content)
    event.target.newContent.value = ''
    dispatch(addAnec(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={addAnect}>
        <div><input name='newContent'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App