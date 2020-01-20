import uuidv4 from 'uuid/v4'

export default function reducer(state, action) {
  switch(action.type) {

    case 'TOGGLE_TODO':
      const toggleTodos = state.todos.map(t =>
        t.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : t
      )
      return { ...state, todos: toggleTodos }

    case 'ADD_TODO':
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      }
      const AddedTodos = [...state.todos, newTodo]
      return { ...state, todos: AddedTodos }

    case 'REMOVE_TODO':
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id)
      return { ...state, todos: filteredTodos }

    default:
      return state
  }
}
