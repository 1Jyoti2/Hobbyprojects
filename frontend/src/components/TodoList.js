import React from 'react';

function TodoList({ todos, toggleComplete, deleteTodo }) {
  if (todos.length === 0) {
    return <p>No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <button 
            className="delete-button"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;