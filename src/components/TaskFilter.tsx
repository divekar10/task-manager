import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, TaskFilterValues } from '../store/tasksSlice';
import { RootState } from '../store/store';
import style from './TaskFilter.module.css';

const TaskFilter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as TaskFilterValues));
  };

  return (
    <div className= {style.task_filter_container}>
      <label htmlFor={style.task_filter} className={style.task_filter_label}>Filter tasks:</label>
      <select
        id= {style.task_filter}
        value={currentFilter}
        onChange={handleFilterChange}
        className={style.task_filter_select}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default TaskFilter;
