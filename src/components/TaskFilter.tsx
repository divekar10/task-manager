import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, SortOrder, TaskFilterValues, setSortOrder } from '../store/tasksSlice';
import { RootState } from '../store/store';
import style from './TaskFilter.module.css';

const TaskFilter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const currentSortOrder = useSelector((state: RootState) => state.tasks.sortOrder);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as TaskFilterValues));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(event.target.value as SortOrder));
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

      <div className={style.task_sort_group}>
        <label htmlFor={style.task_sort} className={style.task_sort_label}>Sort by Due Date:</label>
        <select
          id={style.task_sort}
          value={currentSortOrder}  
          onChange={handleSortChange}
          className={style.task_sort_select}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

    </div>

    
  );
};

export default TaskFilter;
