// src/components/AddTaskModal.tsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type AddTaskModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  fetchTasks: () => void;
  setIsLoading:(loading:boolean)=>void
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, closeModal, fetchTasks, setIsLoading }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<number>(1);
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        setIsLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tasks`,
        { title, priority, status, startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(response.data.message){
        toast.error(response.data.message);
      }else{
        toast.success("Task Added successfully");
      }
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error('Error adding task:', error);
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Priority</label>
              <select
                className="w-full p-2 border rounded"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((priority) => (
                  <option key={priority} value={priority}>
                    Priority {priority}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                className="w-full p-2 border rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Start Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
