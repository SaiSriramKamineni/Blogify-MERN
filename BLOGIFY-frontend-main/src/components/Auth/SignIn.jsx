import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaFacebookF } from 'react-icons/fa'

import { signIn } from '../../services/auth'

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // console.log('Sign In Data.............', formData)
    dispatch(signIn(formData, navigate))
  }

  return (
    <form
      className='flex flex-col gap-y-4'
      autoComplete='off'
      onSubmit={handleOnSubmit}
    >
      <input
        type='email'
        name='email'
        required
        value={email}
        onChange={handleOnChange}
        placeholder='Email'
        className='border-[1px] border-slate-400 p-2 rounded-md bg-transparent placeholder:text-gray-700'
      />
      <input
        type='password'
        name='password'
        required
        value={password}
        onChange={handleOnChange}
        placeholder='Password'
        className='border-[1px] border-slate-400 p-2 rounded-md bg-transparent placeholder:text-gray-700'
      />
      <div className='flex flex-col space-y-2 mb-2'>
        <button
          type='submit'
          className='w-full bg-pink-700 text-white cursor-pointer p-2 rounded-md uppercase'
        >
          Sign In
        </button>
      </div>
    </form>
  )
}

export default SignIn
