import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

function App() {
    return (
        <AuthProvider>
                <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-task" element={<CreateTask />} />
          </Routes>
        </div>
      </Router>
        </AuthProvider>
      
    );
  }

export default App;