"use client"
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaExclamationCircle, FaCheckCircle, FaBan, FaBell  } from 'react-icons/fa';

export default function TaskCard({ task }) {

    const router = useRouter()

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-green-400';
      case 2: return 'bg-yellow-400';
      case 3: return 'bg-red-400'
      default: return 'bg-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in progress': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const isCompleted = task.status.toLowerCase() === 'completed';

  const isDeadlinePassed = new Date(task.deadline) < new Date() && task.status.toLowerCase() !== 'completed'; 

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl hover:cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${isCompleted ? 'line-through' : ''}`}
      onClick={() => router.push(`/tasks/edit/${task.id}`)}
    >
      {isDeadlinePassed && (
        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2">
          <FaBell/>
        </div>
      )}
  
      <h3 className={`font-bold text-2xl mb-3 text-gray-800 capitalize ${isCompleted ? 'line-through' : ''}`}>
        {task.title}
      </h3>
      <p className={`text-gray-600 mb-4 ${isCompleted ? 'line-through' : ''}`}>
        {task.description || 'No description available'}
      </p>
  
      <div className="flex justify-between space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          {task.priority === 1 && <FaExclamationCircle className="text-green-500" />}
          {task.priority === 2 && <FaExclamationCircle className="text-yellow-500" />}
          {task.priority === 3 && <FaExclamationCircle className="text-red-500" />}
          <span className={`text-sm font-semibold text-white px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {['Low', 'Medium', 'High'][task.priority - 1]}
          </span>
        </div>
  
        <div className="flex items-center space-x-2">
          {task.status.toLowerCase() === 'completed' && <FaCheckCircle className="text-green-500" />}
          {task.status.toLowerCase() === 'in progress' && <FaExclamationCircle className="text-yellow-500" />}
          {task.status.toLowerCase() === 'pending' && <FaBan className="text-gray-500" />}
          <span className={`text-sm font-semibold text-white px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
  
      <div className="flex justify-between text-gray-500 text-sm">
        {/* Created At Icon */}
        <div className={`flex items-center space-x-1 ${isCompleted ? 'line-through' : ''}`}>
          <FaCalendarAlt className="text-gray-600" />
          <p>{format(new Date(task.createdAt), 'MMM dd, yyyy')}</p>
        </div>
  
        {/* Deadline Icon */}
        {task.deadline && (
          <div className={`flex items-center space-x-1 ${isCompleted ? 'line-through' : ''}`}>
            <FaClock className="text-gray-600" />
            <p>{format(new Date(task.deadline), 'MMM dd, yyyy')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
