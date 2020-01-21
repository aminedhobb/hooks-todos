import React, { useContext } from 'react'
import axios from 'axios'
import TodosContext from '../context'

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext)
  const title =
    state.todos.length > 0
    ? `${state.todos.length} Todos` : "Nothing to do"

  return(
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-dark p-0">
        {state.todos.map(todo =>
          <li
            key={todo.id}
            className="flex items-center border-black border-dashed border-2 my-2 py-4"
          >
            <span
              className={`flex-1 ml-12 cursor-pointer ${todo.complete && "line-through"}`}
              onDoubleClick={async () => {
                let response = await axios.patch(
                  `https://hooks-api-six.now.sh/todos/${todo.id}`,
                  { ...todo, complete: !todo.complete }
                )
                dispatch({ type: 'TOGGLE_TODO', payload: response.data })}
              }
            >{todo.text}</span>
            <button onClick={() => dispatch({ type: 'SET_CURRENT_TODO', payload: todo })}>
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                className="h-6"
              />
            </button>
            <button>
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
                className="h-6"
                onClick={async () => {
                  await axios.delete(`https://hooks-api-six.now.sh/todos/${todo.id}`)
                  dispatch({ type: 'REMOVE_TODO', payload: todo })
                }}
              />
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
