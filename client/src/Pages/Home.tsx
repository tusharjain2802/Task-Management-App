import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        console.error('Error fetching tasks:', error);
      } finally{
        setIsLoading(false);
      }
    };

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      } finally{
        setIsLoading(false);
      }
    };

    fetchDashboardData();
    fetchTasks();
  }, [navigate]);

  const calculateTimeInHours = (start: string, end: string) => {
    return Math.max(0, (new Date(end).getTime() - new Date(start).getTime()) / 3600000);
  };

  return (
    <div className="container min-h-screen mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
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
        <>
          {/* Task Summary */}
          {summary && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Summary</h2>
                <p>Total Tasks: {summary.totalTasks}</p>
                <p>Completed: {summary.completedPercentage.toFixed(2)}%</p>
                <p>Pending: {summary.pendingPercentage.toFixed(2)}%</p>
                <p>Average Completion Time: {summary.averageCompletionTime >0 ?summary.averageCompletionTime.toFixed(2): 0} hours</p>
              </div>

              {/* Pending Task Summary */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Pending Task Summary</h2>
                <p>Total Pending Tasks: {summary.pendingTasksSummary.totalPendingTasks}</p>
                <p>Total Time Elapsed: {summary.pendingTasksSummary.totalElapsedTime.toFixed(2)} hours</p>
                <p>Total Time to Finish: {summary.pendingTasksSummary.totalTimeToFinish > 0 ?summary.pendingTasksSummary.totalTimeToFinish.toFixed(2):0} hours</p>
              </div>

              {/* Task Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left">
                  <thead className="bg-gray-200">
                    <tr>
                      <th>Title</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Time Lapsed (hrs)</th>
                      <th>Time to Finish (hrs)</th>
                    </tr>
                  </thead>
                  {tasks.length === 0 ? <span>No tasks to show.</span> :
                    <tbody>
                      {tasks?.map((task) => {
                        const timeLapsed = calculateTimeInHours(task.startTime, new Date().toString());
                        const timeToFinish = calculateTimeInHours(new Date().toString(), task.endTime);
                        return (
                          <tr key={task._id} className="border-b">
                            <td>{task.title}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                            <td>{timeLapsed.toFixed(2)}</td>
                            <td>{task.status === 'completed' ? "-" : timeToFinish.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  }
                </table>
              </div>
            </>
          )}
        </>
      }
    </div>
  );
};

export default Home;
