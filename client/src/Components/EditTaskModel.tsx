// src/components/EditTaskModal.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type EditTaskModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  task: any;
  fetchTasks: () => void;
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, closeModal, task, fetchTasks }) => {
  const [title, setTitle] = useState(task.title || '');
  const [priority, setPriority] = useState<number>(task.priority || 1);
  const [status, setStatus] = useState<'pending' | 'completed'>(task.status || 'pending');
  const [startTime, setStartTime] = useState(task.startTime || '');
  const [endTime, setEndTime] = useState(task.endTime || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setStatus(task.status);
      setStartTime(task.startTime);
      setEndTime(task.endTime);
    }
  }, [task]);

  const handleEditTask = async () => {
    const token = localStorage.getItem('token');
    if (!token || !task._id) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${task._id}`,
        { title, priority, status, startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(response.data.message){
        toast.error(response.data.message);
      }else{
        toast.success("Task edited successfully");
      }
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
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
                onClick={handleEditTask}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskModal;
