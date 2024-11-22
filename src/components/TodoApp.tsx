import React, { useState } from 'react'

import { Button, Card, Input, Space } from 'antd'

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
        <Space className="w-full max-w-md mx-auto" direction='vertical'>
            <Card title="To do app" className=''>
                {/* Todo input section */}
                <div className="flex space-x-2 mb-4">
                    <Input
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a new todo"
                    />
                    <Button onClick={handleAddTodo} type='text' className='bg-emerald-500 text-white'>Add</Button>
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
                                <span className={todo.completed ? 'text-gray-400 line-through' : ''}>
                                    {todo.text}
                                </span>
                            </div>
                            <Button
                                type='text'
                                className='bg-destructive text-white hover:bg-destructive/50'
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </Space>
    )
}

export default TodoApp