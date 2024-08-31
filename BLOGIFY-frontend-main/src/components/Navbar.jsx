import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logUserOut } from '../slices/authSlice'

function Navbar() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const user = false
  // console.log(user)

  return (
    <nav className='flex justify-between items-center p-6 shadow-md my-6 rounded-lg transparentCard'>
      <NavLink to='/posts'>
        <div className='flex flex-col items-center'>
          <p className='text-xl font-semibold leading-6 text-pink-600 uppercase'>
            Blogify
          </p>
          <p className='text-xs font-medium leading-3 tracking-[0.22em] text-red-700'>
            ~Shivang Gupta
          </p>
        </div>
      </NavLink>
      {user ? (
        <div className='flex justify-center items-center space-x-2'>
          <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex justify-center items-center font-bold'>
            {user.result.name.charAt(0).toUpperCase()}
          </div>
          <button
            className='bg-pink-700 text-white cursor-pointer p-1 px-4 rounded-md uppercase'
            onClick={() => dispatch(logUserOut())}
          >
            Log Out
          </button>
        </div>
      ) : (
        <button
          className='bg-blue-600 text-white p-1 px-4 rounded-md uppercase'
          onClick={() => navigate('/auth')}
        >
          Sign In
        </button>
      )}
    </nav>
  )
}

export default Navbar
