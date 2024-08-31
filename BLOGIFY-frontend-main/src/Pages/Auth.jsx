import { useState } from 'react'

import SignIn from '../components/Auth/SignIn'
import SignUp from '../components/Auth/SignUp'

function Auth() {
  const [isSignIn, setIsSignIn] = useState(false)

  const toggleState = () => setIsSignIn((prev) => !prev)

  return (
    <div className='w-full max-w-sm mx-auto rounded-lg shadow-lg mb-6 md:mb-0 p-6 transparentCard'>
      <p className='text-center mb-4 text-2xl font-semibold'>
        {!isSignIn ? 'Sign In' : 'Sign Up'}
      </p>
      {!isSignIn ? <SignIn /> : <SignUp />}
      <div className='text-center'>
        {!isSignIn ? (
          <p>
            Don't Have an Account -{' '}
            <span
              className='font-semibold underline text-gray-700 cursor-pointer'
              onClick={toggleState}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already Have an Account -{' '}
            <span
              className='font-semibold underline text-gray-700 cursor-pointer'
              onClick={toggleState}
            >
              Sign In
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Auth
