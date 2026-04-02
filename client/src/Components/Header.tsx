import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const token = localStorage.getItem('token');

  return (
    <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="px-4">Dashboard</Link>
        <Link to="/tasklist" className="px-4">Task List</Link>
      </div>
      <div className="flex items-center">
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
