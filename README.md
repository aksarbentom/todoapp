# TaskMaster - React Todo Application

![TaskMaster Screenshot](https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)

## Overview

TaskMaster is a modern, elegant todo application built with React, TypeScript, and Tailwind CSS. It provides a clean and intuitive interface for managing your daily tasks with features like filtering, editing, and persistent storage.

## Features

- ✅ Create, read, update, and delete tasks
- 🔄 Mark tasks as complete/incomplete
- 🔍 Filter tasks by status (All, Active, Completed)
- 💾 Persistent storage using localStorage
- 📱 Fully responsive design
- 🎨 Beautiful UI with smooth transitions and animations
- ⌨️ Keyboard shortcuts for editing tasks

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **LocalStorage API** - Data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskmaster.git
cd taskmaster
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # UI components
│   ├── TodoForm.tsx    # Form for adding new tasks
│   ├── TodoItem.tsx    # Individual task component
│   ├── TodoList.tsx    # Container for all tasks
│   └── TodoFilter.tsx  # Filter controls
├── hooks/
│   └── useTodos.ts     # Custom hook for todo logic
├── types/
│   └── todo.ts         # TypeScript interfaces
├── App.tsx             # Main application component
└── main.tsx            # Entry point
```

## Usage

### Adding a Task
Type your task in the input field at the top and press Enter or click the plus icon.

### Completing a Task
Click the circle next to a task to mark it as complete.

### Editing a Task
Hover over a task and click the edit icon, or double-click on the task text. Press Enter to save changes or Escape to cancel.

### Deleting a Task
Hover over a task and click the trash icon to remove it.

### Filtering Tasks
Use the filter buttons to show All, Active, or Completed tasks.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- Design inspiration from various modern UI/UX patterns
