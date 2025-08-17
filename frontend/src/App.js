import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from the API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos. Please try again later.');
        setLoading(false);
        console.error('Error fetching todos:', err);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (title) => {
    try {
      const response = await axios.post('/api/todos', { title });
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  // Toggle todo completion status
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };
      
      await axios.put(`/api/todos/${id}`, updatedTodo);
      
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      {error && <div className="error-message">{error}</div>}
      <TodoForm addTodo={addTodo} />
      {loading ? (
        <p>Loading todos...</p>
      ) : (
        <TodoList 
          todos={todos} 
          toggleComplete={toggleComplete} 
          deleteTodo={deleteTodo} 
        />
      )}
    </div>
  );
}

export default App;