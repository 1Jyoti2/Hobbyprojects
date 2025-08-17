from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Path to our JSON file that will store the todos
TODOS_FILE = os.path.join(os.path.dirname(__file__), 'todos.json')

# Initialize the todos file if it doesn't exist
def initialize_todos_file():
    if not os.path.exists(TODOS_FILE):
        with open(TODOS_FILE, 'w') as f:
            json.dump([], f)

# Load todos from the JSON file
def load_todos():
    initialize_todos_file()
    with open(TODOS_FILE, 'r') as f:
        return json.load(f)

# Save todos to the JSON file
def save_todos(todos):
    with open(TODOS_FILE, 'w') as f:
        json.dump(todos, f)

@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(load_todos())

@app.route('/api/todos', methods=['POST'])
def add_todo():
    todos = load_todos()
    new_todo = request.json
    
    # Generate a new ID (simple approach: max ID + 1)
    new_id = 1
    if todos:
        new_id = max(todo['id'] for todo in todos) + 1
    
    new_todo['id'] = new_id
    new_todo['completed'] = False  # Default to not completed
    
    todos.append(new_todo)
    save_todos(todos)
    
    return jsonify(new_todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todos = load_todos()
    todo_data = request.json
    
    for todo in todos:
        if todo['id'] == todo_id:
            # Update the todo with new data
            if 'title' in todo_data:
                todo['title'] = todo_data['title']
            if 'completed' in todo_data:
                todo['completed'] = todo_data['completed']
            
            save_todos(todos)
            return jsonify(todo)
    
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todos = load_todos()
    
    for i, todo in enumerate(todos):
        if todo['id'] == todo_id:
            del todos[i]
            save_todos(todos)
            return jsonify({'message': 'Todo deleted'})
    
    return jsonify({'error': 'Todo not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)