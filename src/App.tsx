import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskFilter />
      <TaskList />
    </div>
  );
};

export default App;
