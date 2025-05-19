Task Board Application
A modern, drag-and-drop task management application built with React. This application allows users to create, edit, delete, and move tasks between different status columns using an intuitive drag-and-drop interface.


Features
Drag-and-Drop Interface: Easily move tasks between "To Do", "In Progress", and "Done" columns
CRUD Operations: Create, read, update, and delete tasks with a user-friendly interface
Responsive Design: Works on desktop and mobile devices
Real-time Updates: Tasks update in the UI and database simultaneously

Tech Stack

Frontend:

React 18
react-beautiful-dnd for drag-and-drop functionality
Tailwind CSS for styling


Backend (not included in this repository):

RESTful API for task management
Database for task storage



Installation

Clone the repository:
bashgit clone https://github.com/Aayushgupta2005/TaskBoardFrontend.git
cd task-board

Install dependencies:
bashnpm install

Start the development server:
bashnpm run dev

Open your browser and navigate to:
http://localhost:5173/


Project Structure
src/
├── api/                  # API integration
│   └── index.js          # API functions for CRUD operations
├── components/
│   ├── Column.jsx        # Column component for each status
│   ├── TaskBoard.jsx     # Main board component
│   ├── TaskCard.jsx      # Individual task card component
│   └── TaskFormModal.jsx # Modal for creating/editing tasks
├── App.jsx               # Root App component
├── main.jsx              # Entry point with React rendering
└── index.css             # Global styles
Component Overview
TaskBoard.jsx
The main component that manages the application state and renders the columns. It handles:

Fetching tasks from the API
Managing the task creation/editing modal
Implementing drag-and-drop functionality
CRUD operations for tasks

Column.jsx
Represents a status column (To Do, In Progress, Done) and renders the tasks for that status. It implements the droppable area for the drag-and-drop functionality.
TaskCard.jsx
Represents an individual task card. It displays the task information and implements the draggable functionality.
TaskFormModal.jsx
A modal component for creating and editing tasks. It manages form state and handles form submission.
API Integration
The application expects a backend API with the following endpoints:

GET /api/tasks - Fetch all tasks
POST /api/tasks - Create a new task
PUT /api/tasks/:id - Update a task
DELETE /api/tasks/:id - Delete a task

The API functions are encapsulated in the api/index.js file.
React-Beautiful-DnD Integration
This project uses react-beautiful-dnd for drag-and-drop functionality. Key components:

DragDropContext in TaskBoard.jsx wraps all droppable areas
Droppable in Column.jsx defines drop zones for tasks
Draggable in TaskCard.jsx makes tasks draggable

Troubleshooting
Common Issues:

Drag and Drop Not Working:

Ensure react-beautiful-dnd is properly installed
Check browser console for errors
Verify that each draggable has a unique ID


React 18 Compatibility Issues:

The application includes workarounds for known React 18 compatibility issues with react-beautiful-dnd
If issues persist, try downgrading to React 17


API Connection Errors:

Verify that your backend API is running
Check API endpoint URLs in api/index.js