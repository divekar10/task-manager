import React, { useState } from 'react';
import { Task } from '../types/task';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion, editTask } from '../store/tasksSlice';
import { format } from 'date-fns';
import Style from './TaskForm.module.css';
import TaskItemStyle from './TaskItem.module.css';

interface TaskItemProps {
    task: Task;
    className: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, className }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [editDueDate, setEditDueDate] = useState(task.dueDate);

    let lineThroughStyle: React.CSSProperties = {
        textDecoration: task.completed ? 'line-through' : 'none'
    }

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editTask({
            id: task.id,
            title: editTitle,
            description: editDescription,
            dueDate: editDueDate,
        }));
        setIsEditing(false);
    };

    const handleToggleCompletion = () => {
        dispatch(toggleTaskCompletion(task.id));
    };

    return (
        <div className={Style.form}>
            {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                    <input
                        required
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                        required
                        type='text'
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <input
                        required
                        type="date"
                        value={format(editDueDate, 'yyyy-MM-dd')}
                        onChange={(e) => setEditDueDate(new Date(e.target.value))}
                    />
                    <div className={TaskItemStyle.button_container}>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className={className} >
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleToggleCompletion}
                    />
                    <h3 style={lineThroughStyle}>{task.title}</h3>
                    <p style={lineThroughStyle}>{task.description}</p>
                    <p style={lineThroughStyle}>Due: {format(task.dueDate, 'dd-MM-yyyy')}</p>
                    <div className={TaskItemStyle.button_container}>
                        <button disabled={task.completed} onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                    </div>
                </ div>
            )}
        </div>
    );
};

export default TaskItem;
