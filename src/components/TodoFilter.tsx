import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    total: number;
    active: number;
    completed: number;
  };
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange, todoCount }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="text-sm text-gray-500 mb-3 sm:mb-0">
        {todoCount.total} tasks • {todoCount.active} active • {todoCount.completed} completed
      </div>
      
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filter === 'all'
              ? 'bg-indigo-500 text-white'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filter === 'active'
              ? 'bg-indigo-500 text-white'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filter === 'completed'
              ? 'bg-indigo-500 text-white'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;
