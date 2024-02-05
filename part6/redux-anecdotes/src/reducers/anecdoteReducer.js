import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'Anecdotes',
  initialState: [],
  reducers:{
    addVote(state, action) {
      // const dispatch = useDispatch()
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      // dispatch(setNotification('you voted ' + anecdoteToChange.content))

      // setTimeout(() => {
      //   dispatch(removeNotification())

      // }, 5000)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      
      const finalAns = state.map(anec =>
        anec.id !== id ? anec : changedAnecdote
      )
      return finalAns 
    },
    addAnec(state, action) {
      const newAnec = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      state.push(newAnec)
    },
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnec(state, action) {
      return action.payload
    }
  }
})

export const { addAnec, addVote, setAnec, appendAnec } = anecdoteSlice.actions
export default anecdoteSlice.reducer