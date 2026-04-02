import './App.css'
import {Toaster} from 'react-hot-toast';
import AllRoutes from './AllRoutes.js';

function App() {

  return (
    <div className='app'>
      <AllRoutes />
      <Toaster />
    </div>
  )
}

export default App;