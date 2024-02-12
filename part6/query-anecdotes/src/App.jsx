import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdots, createAnec, updateAnec } from './request'
import { useReducer } from 'react'

const notiReducer = (state, action) => {
  switch (action.type) {
    case "notiVote":
      return 'you voted ' + action.content
    case "notiCreate":
      return 'you created ' + action.content
    case "error":
      return 'too short anecdote, must have length 5 or more'
    default:
      return ''
    
  }
}

const App = () => {
  const [noti, notiDispatch] = useReducer(notiReducer, '')

  const queryClient = useQueryClient()

  const getID = () => (10000*Math.random()).toFixed(0)

  const newAnecMutation = useMutation({ 
    mutationFn: createAnec,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']}) //call query anecdotes again 
    },
    onError: () => {
      notiDispatch({ type: "error"})
      setTimeout(() => {
        notiDispatch({ type: "default"})
      }, 5000)
    }
  })

  const updateAnecMutation = useMutation({
    mutationFn: updateAnec,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdots,
    retry: 1
  })


  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data 


  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]
  
  const handleVote = (id) => {
    console.log(id)
    const anec = anecdotes.find(anec => anec.id === id)
    updateAnecMutation.mutate({...anec, votes: anec.votes + 1})
    notiDispatch({ type: "notiVote", content: anec.content })
    setTimeout(() => {
      notiDispatch({ type: "default"})
    }, 5000)
  }

  const addAnec = (content) => {
    newAnecMutation.mutate({content, id: getID(), votes: 0})
    notiDispatch({ type: "notiCreate", content: content })
    setTimeout(() => {
      notiDispatch({ type: "default"})
    }, 5000)

  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification noti={noti}/>
      <AnecdoteForm addAnec={addAnec}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
