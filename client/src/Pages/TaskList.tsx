import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddTaskModal from '../Components/AddTaskModel';
import EditTaskModal from '../Components/EditTaskModel';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner'; 

const TaskList = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
    const [sortOption, setSortOption] = useState<string>('startTimeAsc');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<any | null>(null);
    const [filterPriority, setFilterPriority] = useState<number | null>(null);
    const navigate = useNavigate();

    const fetchTasksWithoutFilter = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            setIsLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (error) {
            toast.error("Error fetching tasks");
            localStorage.removeItem('token');
            console.error('Error fetching tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/sorted`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        sortBy: sortOption,
                        filterByStatus: filterStatus,
                        filterByPriority: filterPriority,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                toast.error("Error fetching tasks");
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [navigate, sortOption, filterStatus, filterPriority]);

    const handleSelectTask = (taskId: string) => {
        const newSelectedTasks = new Set(selectedTasks);
        if (newSelectedTasks.has(taskId)) {
            newSelectedTasks.delete(taskId);
        } else {
            newSelectedTasks.add(taskId);
        }
        setSelectedTasks(newSelectedTasks);
    };

    const handleDeleteSelected = async () => {
        const token = localStorage.getItem('token');
        if (!token || selectedTasks.size === 0) return;

        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { taskIds: Array.from(selectedTasks) },
            });
            if (response.data.message) {
                toast.error(response.data.message);
            } else {
                toast.success("Tasks deleted successfully");
            }
            setSelectedTasks(new Set());
            setTasks(tasks.filter((task) => !selectedTasks.has(task._id)));
        } catch (error) {
            console.error('Error deleting tasks', error);
        }
    };

    const handleAddTask = () => {
        setIsAddTaskModalOpen(true);
    };

    const handleEditTask = (task: any) => {
        setTaskToEdit(task);
        setIsEditTaskModalOpen(true);
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    const handleStatusFilter = (status: string) => {
        setFilterStatus(status);
    };

    const handlePriorityFilter = (priority: number) => {
        setFilterPriority(priority);
    };

    return (
        <div className="container min-h-screen mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Task List</h1>

            <div className="mb-4 flex items-center">
                <button
                    className="btn border duration-500 transition-colors border-blue-900 rounded-xl hover:bg-blue-900 hover:text-white px-2 py-1 text-blue-900 mr-2"
                    onClick={handleAddTask}>+ Add Task</button>
                <button
                    className="btn border duration-500 transition-colors border-red-600 hover:bg-red-600 hover:text-white px-2 py-1 text-red-600 mr-2"
                    onClick={handleDeleteSelected}>
                    🗑️ Delete Selected
                </button>
                <AddTaskModal
                    isOpen={isAddTaskModalOpen}
                    closeModal={() => setIsAddTaskModalOpen(false)}
                    fetchTasks={fetchTasksWithoutFilter}
                    setIsLoading={setIsLoading}
                />
                {isEditTaskModalOpen && (
                    <EditTaskModal
                        isOpen={isEditTaskModalOpen}
                        closeModal={() => setIsEditTaskModalOpen(false)}
                        task={taskToEdit}
                        fetchTasks={fetchTasksWithoutFilter}
                    />
                )}
                <select
                    className="ml-auto border-gray-600 border rounded-2xl p-1 text-gray-600 hover:text-white hover:bg-gray-600 mr-2"
                    onChange={(e) => handleSortChange(e.target.value)}
                    value={sortOption}
                >
                    <option value="startTimeAsc">Start Time ASC</option>
                    <option value="startTimeDesc">Start Time DESC</option>
                    <option value="endTimeAsc">End Time ASC</option>
                    <option value="endTimeDesc">End Time DESC</option>
                </select>
                <select
                    className="mr-2 border-gray-600 border rounded-2xl p-1 text-gray-600 hover:text-white hover:bg-gray-600"
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    value={filterStatus}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    onChange={(e) => handlePriorityFilter(Number(e.target.value))}
                    value={filterPriority || ''}
                    className='border-gray-600 border rounded-2xl p-1 text-gray-600 hover:text-white hover:bg-gray-600'
                >
                    <option value="null">All Priorities</option>
                    {[1, 2, 3, 4, 5].map((priority) => (
                        <option key={priority} value={priority}>
                            Priority {priority}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading ? 
            <div className='flex justify-center mt-24'>
            <Bars
                height="80"
                width="80"
                color="#000000"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            </div> :

                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={() => { }}
                                        checked={selectedTasks.size === tasks.length}
                                    />
                                </th>
                                <th>Title</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Time to Finish (hrs)</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        {tasks.length === 0 ? <span>No tasks found</span> :
                            <tbody>
                                {tasks.map((task) => {
                                    const timeToFinish = Math.max(
                                        0,
                                        (new Date(task.endTime).getTime() - new Date().getTime()) / 3600000
                                    ).toFixed(2);

                                    return (
                                        <tr key={task._id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTasks.has(task._id)}
                                                    onChange={() => handleSelectTask(task._id)}
                                                />
                                            </td>
                                            <td>{task.title}</td>
                                            <td>{task.priority}</td>
                                            <td>{task.status}</td>
                                            <td>{new Date(task.startTime).toLocaleString()}</td>
                                            <td>{new Date(task.endTime).toLocaleString()}</td>
                                            <td>{task.status === 'completed' ? "-" : timeToFinish}</td>
                                            <td>
                                                <button onClick={() => handleEditTask(task)} className="btn">🖋️</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        }
                    </table>
                </div>
            }
        </div>
    );
};

export default TaskList;
