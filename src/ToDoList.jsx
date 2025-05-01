import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import io from 'socket.io-client';
const socket = io('https://crudsocket.netlify.app/');
export default function ToDoList() {
    const [toDoData, setToDoData] = useState([
        { name: 'Mayank', id: 1 },
        { name: 'Mayank2', id: 2 },
        { name: 'Mayank3', id: 3 }
    ]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        socket.on('delete_todo', (id) => {
            setToDoData(prev => prev.filter(item => item.id !== id));
        });

        socket.on('add_todo', (item) => {
            setToDoData(prev => [...prev, item]);
            toast(item.name, {autoClose:2000});
        });

        return () => {
            socket.off('delete_todo');
            socket.off('add_todo');
        }
    }, []);

    const handleDelete = (id) => {
        setToDoData(prev => prev.filter(item => item.id !== id));
        socket.emit('delete_todo', id);
    };

    const handleAdd = () => {
        if (!newTask.trim()) return;

        const newItem = {
            id: Date.now(),  
            name: newTask
        };

        setToDoData(prev => [...prev, newItem]);
        socket.emit('add_todo', newItem);
        setNewTask(""); 
    };

    return (
        <>
            <input 
                type="text" 
                placeholder="Enter task" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
            />
            <button onClick={handleAdd}>Add</button>

            <ul>
                {toDoData.map((item) => (
                    <div key={item.id}>
                        <li>{item.name}</li>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                ))}
            </ul>
            {/* <ToastContainer/> */}
        </>
    );
}
