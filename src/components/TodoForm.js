import React, { useState, useContext, useEffect } from 'react'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import TodosContext from '../context'

export default function TodoForm() {
  const [todo, setTodo] = useState('')
  const { state: { currentTodo }, dispatch } = useContext(TodosContext)

  const handleSubmit = async event => {
    event.preventDefault()
    if (currentTodo.text) {
      dispatch({ type: 'UPDATE_TODO', payload: todo })
    } else {
      let response = await axios.post(
        'https://hooks-api-six.now.sh/todos',
        {
          id: uuidv4(),
          text: todo
        }
      )
      dispatch({ type: 'ADD_TODO', payload: response.data })
    }
    setTodo('')
  }

  useEffect(
    () => {
      if (currentTodo.text) {
        setTodo(currentTodo.text)
      } else {
        setTodo('')
      }
    }, [currentTodo.id]
  )

  return(
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  )
}
