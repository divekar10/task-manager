import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './store';
import { Task } from '../types/task';

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   dueDate: string;
//   completed: boolean;
// }

export type TaskFilterValues = 'all' | 'completed' | 'pending';
const TASKS_STORAGE_KEY = 'taskManagerTasks';

// Utility to save tasks to local storage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

// Utility to load tasks from local storage
const loadTasksFromLocalStorage = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
  return tasksJson ? JSON.parse(tasksJson) : [];
};

interface TasksState {
  tasks: Task[];
  filter: TaskFilterValues;
}

const initialState: TasksState = {
  tasks: loadTasksFromLocalStorage(),
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string; dueDate: Date }>) => {
      const newTask: Task = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        completed: false,
      };
      state.tasks.push(newTask);
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks); 
    },
    editTask: (state, action: PayloadAction<{ id: string; title?: string; description?: string; dueDate?: Date }>) => {
      const { id, title, description, dueDate } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (dueDate !== undefined) task.dueDate = dueDate;
      }
      saveTasksToLocalStorage(state.tasks);
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      saveTasksToLocalStorage(state.tasks);
    },
    setFilter: (state, action: PayloadAction<TaskFilterValues>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, deleteTask, editTask, toggleTaskCompletion, setFilter } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export default tasksSlice.reducer;
