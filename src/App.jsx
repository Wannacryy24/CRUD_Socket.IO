import React from 'react'
import ToDoList from './ToDoList'
import Notification from './Notification'
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const socket = io('http://localhost:4001');

export default function App() {
  return (
    <>
    <ToDoList/>
    <Notification socket={socket}/>
    <ToastContainer/>
    </>
  )
}
