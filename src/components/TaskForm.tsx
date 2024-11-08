import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import styles from './TaskForm.module.css';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dueDate) {
    dispatch(addTask({ title, description, dueDate }));
    setTitle('');
    setDescription('');
    setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input required type="text"maxLength={50} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input required maxLength={100} type="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input required min={today} type="date" value={dueDate ? dueDate.toISOString().split('T')[0] : ''} onChange={(e) => setDueDate(new Date(e.target.value))} />
      <button type="submit">Add Task</button>
    </form>
  );
};

 export default TaskForm;
