import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { isImage } from '../../validImage'

import { createPost, getPosts, updatePost } from '../../services/posts'
import { setLoading } from '../../slices/loaderSlice'
import { setEditPost } from '../../slices/postsSlice'
import { logUserOut } from '../../slices/authSlice'
import { checkUserToken } from '../../services/checkUserToken'
import Loader from '../Loader'
import TagsInput from './TagsInput'

function Form() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { editPost } = useSelector((state) => state.posts)
  const { loading } = useSelector((state) => state.loading)
  const { user } = useSelector((state) => state.auth)

  // console.log(JSON.parse(localStorage.getItem('user')).token)

  const [tagInputs, setTagInputs] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    tags: tagInputs,
    selectedFile: '',
  })

  useEffect(() => {
    if (editPost) {
      if (!checkUserToken()) {
        toast.info('Session Expired!')
        dispatch(logUserOut())
        return
      }
      // console.log(editPost)
      setFormData({
        title: editPost.title,
        message: editPost.message,
        tags: editPost.tags,
        selectedFile: editPost.selectedFile,
      })
      setTagInputs(editPost.tags)
    }
  }, [editPost])

  useEffect(() => {
    if (tagInputs.length >= 1) {
      setFormData((prev) => ({ ...prev, tags: tagInputs }))
    }
  }, [tagInputs])

  const handleOnChange = (e) => {
    if (!checkUserToken()) {
      toast.info('Session Expired!')
      dispatch(logUserOut())
      return
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageUpload = (e) => {
    if (!isImage(e.target.files[0])) {
      toast.error('Not Valid Image')
      return
    }
    setFormData((prev) => ({ ...prev, selectedFile: e.target.files[0] }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('You are not Logged In!')
      return
    }
    // console.log(formData)

    // checks if login token is still valid
    if (!checkUserToken()) {
      toast.info('Session Expired!')
      dispatch(logUserOut())
      return
    }

    setTagInputs([])
    setFormData({
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
    })
    e.target.reset()

    dispatch(setLoading(true))

    if (editPost) {
      if (editPost.selectedFile === formData.selectedFile) {
        dispatch(updatePost(formData, editPost._id))
        dispatch(setEditPost(null))
        dispatch(setLoading(false))
        toast.success('Edited Successfully!')
      } else {
        const data = new FormData()

        data.append('file', formData.selectedFile)
        data.append('upload_preset', 'blogify-project')
        data.append('cloud_name', 'dcls2mzxc')

        fetch('https://api.cloudinary.com/v1_1/dcls2mzxc/image/upload', {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(
              updatePost(
                {
                  ...formData,
                  selectedFile: data.secure_url,
                },
                editPost._id
              )
            )
            dispatch(setEditPost(null))
            dispatch(setLoading(false))
            toast.success('Edited Successfully!')
          })
          .catch((err) => {
            dispatch(setLoading(false))
            // console.log('Cloudinary upload error.........', err)
          })
      }
    } else {
      if (!formData.selectedFile) {
        const post = {
          ...formData,
          name: user.result.name,
          creator: user.result._id,
          createdAt: new Date().toISOString(),
        }
        dispatch(createPost(post))
        dispatch(getPosts(1))
        navigate('/posts')
        dispatch(setLoading(false))
        toast.success('Posted Successfully!')
        return
      }
      const data = new FormData()
      data.append('file', formData.selectedFile)
      data.append('upload_preset', 'blogify-project')
      data.append('cloud_name', 'dcls2mzxc')

      fetch('https://api.cloudinary.com/v1_1/dcls2mzxc/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const post = {
            ...formData,
            name: user.result.name,
            creator: user.result._id,
            selectedFile: data.secure_url,
            createdAt: new Date().toISOString(),
          }
          dispatch(createPost(post))
          navigate('/posts')
          dispatch(setLoading(false))
          toast.success('Posted Successfully!')
        })
        .catch((err) => {
          dispatch(setLoading(false))
          toast.error('Something Went Wrong!')
          // console.log('Cloudinary upload error.........', err)
        })
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setFormData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
    setTagInputs([])
  }

  const handleCancel = (e) => {
    e.preventDefault()
    dispatch(setEditPost(null))
    setFormData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  const { title, message, tags } = formData

  if (loading) {
    return (
      <div className='w-full min-h-[400px] flex justify-center items-center rounded-lg shadow-lg p-6 transparentCard'>
        <Loader color='#BE185D' />
      </div>
    )
  }

  return (
    <div className='w-full rounded-lg shadow-lg p-6 transparentCard'>
      <p className='text-center mb-4'>
        {!editPost ? 'Creating a Blog' : 'Editing Blog'}
      </p>
      <form
        autoComplete='off'
        onSubmit={handleOnSubmit}
        className='flex flex-col gap-y-4'
      >
        <input
          type='text'
          name='title'
          required
          disabled={!user}
          value={title}
          onChange={handleOnChange}
          maxLength={60}
          placeholder='Title'
          className='border-[1px] border-slate-400 p-2 rounded-md bg-transparent placeholder:text-gray-700'
        />
        <textarea
          name='message'
          required
          disabled={!user}
          value={message}
          onChange={handleOnChange}
          placeholder='Message'
          className='border-[1px] border-slate-400 p-2 resize-y rounded-md bg-transparent placeholder:text-gray-700'
        />
        <TagsInput
          tagInputs={tagInputs}
          setTagInputs={setTagInputs}
          user={user}
        />
        <input
          type='file'
          onChange={(e) => handleImageUpload(e)}
          disabled={!user}
        />
        <div className='w-full flex flex-col space-y-2'>
          <button
            type='submit'
            disabled={!user}
            className='bg-pink-700 text-white cursor-pointer p-2 rounded-md uppercase'
          >
            {!editPost ? 'Submit' : 'Edit'}
          </button>

          {!editPost ? (
            <button
              onClick={handleClear}
              disabled={!user}
              className='bg-blue-600 text-white p-1 rounded-md'
            >
              Clear
            </button>
          ) : (
            <button
              onClick={handleCancel}
              disabled={!user}
              className='bg-blue-600 text-white p-1 rounded-md'
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Form
