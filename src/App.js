import React, { useContext, useReducer } from 'react';
import { UserContext } from './index'

const initialState = {
  count: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1
      }
    case 'decrement':
      return {
        count: state.count - 1
      }
    case 'reset':
      return initialState
    default:
      return initialState
  }
}

export default function App() {
  const value = useContext(UserContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      count : {state.count}
      <button className="border m-1 p-1" onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
      <button className="border m-1 p-1" onClick={() => dispatch({ type: 'decrement' })}>
        Decrement
      </button>
      <button className="border m-1 p-1" onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  )
}
