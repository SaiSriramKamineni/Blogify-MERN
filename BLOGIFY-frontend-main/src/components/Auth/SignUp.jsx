import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaFacebookF } from 'react-icons/fa'

import { signUp } from '../../services/auth'

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords Do Not Match!')
      return
    }
    dispatch(signUp(formData, navigate))
  }

  return (
    <form
      className='flex flex-col gap-y-4 p-6 bg-white shadow-lg rounded-lg'
      autoComplete='off'
      onSubmit={handleOnSubmit}
    >
      <input
        type='text'
        name='name'
        required
        value={name}
        onChange={handleOnChange}
        placeholder='Name'
        className='border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500'
      />
      <input
        type='email'
        name='email'
        required
        value={email}
        onChange={handleOnChange}
        placeholder='Email'
        className='border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500'
      />
      <input
        type='password'
        name='password'
        required
        value={password}
        onChange={handleOnChange}
        placeholder='Password'
        className='border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500'
      />
      <input
        type='password'
        name='confirmPassword'
        required
        value={confirmPassword}
        onChange={handleOnChange}
        placeholder='Confirm Password'
        className='border border-slate-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent placeholder-gray-500'
      />
      <div className='flex flex-col space-y-3 mt-4'>
        <button
          type='submit'
          className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out uppercase'
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignUp
