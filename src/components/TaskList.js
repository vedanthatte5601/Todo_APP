import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const filterTasks = () => {
      let filtered = tasks;

      // Filter by status
      if (statusFilter !== 'All') {
        filtered = filtered.filter(task => task.status === statusFilter);
      }

      // Filter by priority
      if (priorityFilter !== 'All') {
        filtered = filtered.filter(task => task.priority === priorityFilter);
      }

      // Filter by due date
      if (dueDateFilter) {
        filtered = filtered.filter(task => task.due_date === dueDateFilter);
      }

      // Search by title or description
      if (searchTerm) {
        filtered = filtered.filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredTasks(filtered);
    };

    filterTasks();
  }, [tasks, statusFilter, priorityFilter, dueDateFilter, searchTerm]);

  return (
    <div>
      <h2>Tasks</h2>

      {/* Filter and Search Inputs */}
      <div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.due_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
