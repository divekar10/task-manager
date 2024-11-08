# Task Manager Application
A Task Manager built with React, TypeScript, and Redux. This application allows users to create, edit, delete, and manage tasks, with additional features for filtering and sorting tasks based on completion status and due dates. Task data is stored in local storage to persist data across page reloads.

## Features

Add, Edit, Delete Tasks: Manage tasks with title, description, and due date.

Mark Tasks as Complete: Use checkboxes to mark tasks as complete.

Filter Tasks: View all tasks, only completed tasks, or only pending tasks.

Sort Tasks: Sort tasks by due date in ascending or descending order.

Local Storage Persistence: Tasks are saved in local storage, so they remain available even after page reloads.

## Technologies Used

React (with Functional Components and Hooks)

TypeScript for type safety

Redux and Redux Toolkit for state management

CSS for styling

date-fns for date formatting

localStorage for persistence

# Installation
1. Clone the repository:

    git clone https://github.com/yourusername/task-manager.git
    cd task-manager

2. Install dependencies:

   npm install

3. Start the application:

   npm start

The app should now be running at http://localhost:3000.

## Redux State Management
This app uses Redux to manage the task state and filter/sort options:

tasks: Holds the array of tasks.

filter: Determines the current filter (all, completed, or pending).

sortOrder: Controls sorting order by due date.

## Local Storage Persistence
Task data is saved to local storage after each update. This ensures tasks persist across page reloads.
