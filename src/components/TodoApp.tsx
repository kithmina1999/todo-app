import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

type Todo = {
    id: number
    text: string
    completed: boolean
}

const TodoApp = () => {

    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState('')

    // Add new todo
    const handleAddTodo = () => {
        if (newTodo.trim()) {
            const newTodoItem = {
                id: Date.now(),
                text: newTodo,
                completed: false
            }
            setTodos([...todos, newTodoItem])
            setNewTodo('')
        }
    }
    // Toggle todo completion
    const handleToggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    // Delete todo
    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Todo List</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Todo input section */}
                <div className="flex space-x-2 mb-4">
                    <Input
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a new todo"
                    />
                    <Button onClick={handleAddTodo}>Add</Button>
                </div>

                {/* Todo list rendering */}
                <div className="space-y-2">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex justify-between items-center p-2 border rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}
                                />
                                <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                                    {todo.text}
                                </span>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default TodoApp