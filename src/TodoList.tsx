import React, { useState } from 'react';

interface Task {
    id: number;
    name: string;
    completed: boolean;
}

function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim()) {
            setTasks([{ id: Math.random(), name: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const handleEditTask = (id: number, newName: string) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const handleDeleteTask = (id: number) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const handleCheckTask = (id: number) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="text" value={inputValue} onChange={handleInputChange} autoFocus />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li>
                        <input type="checkbox" checked={task.completed} onChange={() => handleCheckTask(task.id)} />
                        <input type="text" value={task.name} onChange={(event) => handleEditTask(task.id, event.target.value)} />
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
