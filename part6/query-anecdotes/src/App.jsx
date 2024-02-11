import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdots, createAnec, updateAnec } from './request'
const App = () => {
  const queryClient = useQueryClient()

  const getID = () => (10000*Math.random()).toFixed(0)

  const newAnecMutation = useMutation({ 
    mutationFn: createAnec,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']}) //call query anecdotes again 
    },
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
  }

  const addAnec = (content) => {
    newAnecMutation.mutate({content, id: getID(), votes: 0})

  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
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
