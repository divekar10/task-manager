import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import style from './TaskList.module.css';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const sortOrder = useSelector((state: RootState) => state.tasks.sortOrder);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

    // Sort tasks by dueDate based on sortOrder
    const sortedTasks = filteredTasks.sort((a, b) => {
      if (sortOrder === 'asc') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    });

  return (
    <div className= {style.task_list_container}>
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task} className={style.task_item}/>
      ))}
    </div>
  );
};

export default TaskList;
