import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import style from './TaskList.module.css';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className= {style.task_list_container}>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} className={style.task_item}/>
      ))}
    </div>
  );
};

export default TaskList;
