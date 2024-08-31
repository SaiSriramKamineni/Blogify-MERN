import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Home from './Pages/Home'
import PostDetails from './Pages/PostDetails'
import Auth from './Pages/Auth'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <div className='container w-[95%] max-w-[1400px] mx-auto'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/posts' />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/auth' element={<PrivateRoute />}>
            <Route path='/auth' element={<Auth />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position='top-center' />
    </div>
  )
}

export default App
