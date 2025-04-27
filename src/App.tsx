import React from 'react';
import { CheckCircle } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';

function App() {
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    editTodo, 
    filter, 
    setFilter,
    todoCount
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle size={32} className="text-indigo-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">TaskMaster</h1>
          </div>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </header>

        <main className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/80">
          <TodoForm onAdd={addTodo} />
          
          <TodoFilter 
            filter={filter} 
            onFilterChange={setFilter} 
            todoCount={todoCount}
          />
          
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </main>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TaskMaster • Your tasks are stored locally</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
