import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ToDoList from './pages/ToDo/ToDoList';
import 'antd/dist/reset.css';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/to-do-list" element={<ToDoList />} />

      </Routes>
  )
}

export default App