import React, { useContext } from 'react'
import TodosContext from '../context'

export default function TodoList() {
  const { state } = useContext(TodosContext)

  console.log(state)

  return(
    <div>
      <ul>
        {state.todos.map(todo =>
          <li key={todo.id}>
            {todo.text}
          </li>
        )}
      </ul>
    </div>
  )
}
