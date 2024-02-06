import { createSlice } from "@reduxjs/toolkit"

import anecService from '../services/anec'


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
      const newAnec = action.payload
      state.push(newAnec)
    },
    setAnec(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch(setAnec(anecs))
  }
}

export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(addAnec(newAnec))
  }
}

export const increaseLike = (id, anec) => {
  return async dispatch => {
    const newAnec = await anecService.updateVote(id, anec)
    dispatch(addVote(id))

  }
}

export const { addAnec, addVote, setAnec, appendAnec } = anecdoteSlice.actions
export default anecdoteSlice.reducer