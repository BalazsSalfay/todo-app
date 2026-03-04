import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', done: false },
    { id: 2, text: 'Walk the dog', done: false },
  ])
  const [input, setInput] = useState('')

  function addTodo(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setInput('')
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  const remaining = todos.filter(t => !t.done).length

  return (
    <div className="card">
      <h1 className="title">Todo</h1>
      <p className="subtitle">{remaining} task{remaining !== 1 ? 's' : ''} remaining</p>

      <form onSubmit={addTodo} className="form">
        <input
          className="input"
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="btn-add" type="submit">Add</button>
      </form>

      <ul className="list">
        {todos.length === 0 && (
          <li className="empty">All done! Add a task above.</li>
        )}
        {todos.map(todo => (
          <li key={todo.id} className={`item ${todo.done ? 'done' : ''}`}>
            <button
              className="checkbox"
              onClick={() => toggleTodo(todo.id)}
              aria-label={todo.done ? 'Mark incomplete' : 'Mark complete'}
            >
              {todo.done && (
                <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <span className="text">{todo.text}</span>
            <button
              className="btn-delete"
              onClick={() => deleteTodo(todo.id)}
              aria-label="Delete task"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
