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
    // console.log('Sign Up Data.............', formData)
    dispatch(signUp(formData, navigate))
  }

  return (
    <form
      className='flex flex-col gap-y-4'
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
        className='border-[1px] border-slate-400 p-2 rounded-md bg-transparent placeholder:text-gray-700'
      />
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
      <input
        type='password'
        name='confirmPassword'
        required
        value={confirmPassword}
        onChange={handleOnChange}
        placeholder='Confirm Password'
        className='border-[1px] border-slate-400 p-2 rounded-md bg-transparent placeholder:text-gray-700'
      />
      <div className='flex flex-col space-y-2 mb-2'>
        <button
          type='submit'
          className='w-full bg-pink-700 text-white cursor-pointer p-2 rounded-md uppercase'
        >
          Sign Up
        </button>
       
      </div>
    </form>
  )
}

export default SignUp
