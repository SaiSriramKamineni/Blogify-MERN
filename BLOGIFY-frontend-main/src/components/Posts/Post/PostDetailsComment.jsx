import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePost } from '../../../services/posts'
import { checkUserToken } from '../../../services/checkUserToken'
import { logUserOut } from '../../../slices/authSlice'
import { toast } from 'react-toastify'
import { FaTrashAlt } from 'react-icons/fa'

function PostDetailsComment({ user, id, post, handleCommentDel }) {
  const [formData, setFormData] = useState('')
  const dispatch = useDispatch()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (!checkUserToken()) {
      toast.info('Session Expired!')
      dispatch(logUserOut())
      return
    }
    if (!formData) {
      toast.error('You are not Logged in!')
      return
    }
    const newComment = {
      creator: user.result._id,
      comment: `${user.result.name}: ${formData}`,
      createdAt: new Date().toISOString(),
    }

    post.comments.push(newComment)
    dispatch(updatePost(post, id))
    setFormData('')
  }

  return (
    <div className='max-w-[500px] md:max-w-[unset] mx-auto md:mx-0 my-6 md:my-0 transparentCard w-full md:w-[50%] p-6'>
      <form className='w-full flex flex-col gap-y-2' onSubmit={handleOnSubmit}>
        <textarea
          name='comment'
          value={formData}
          maxLength={100}
          onChange={(e) => setFormData(e.target.value)}
          required
          placeholder='Add Your Comment'
          className='w-full border-[1px] border-slate-400 p-2 resize-y rounded-md bg-transparent placeholder:text-gray-700'
        />
        <button
          type='submit'
          disabled={!user}
          className='bg-blue-600 text-white cursor-pointer p-2 rounded-md uppercase'
        >
          Add Comment
        </button>
      </form>
      {post.comments.length > 0 && (
        <div>
          <p className='text-xl font-semibold mt-4'>Comments: </p>
          {post.comments.map((comment, index) => (
            <div
              key={index}
              className={`text-lg font-medium flex justify-between items-center group ${
                index !== post.comments.length - 1 &&
                'border-b-[1px] border-gray-400 pb-2'
              }`}
            >
              <p className='w-[calc(100%-30px)] mt-2'>
                <span className='font-bold'>
                  {comment.comment.split(':')[0]} :{' '}
                </span>
                {comment.comment.split(':')[1]}
              </p>
              <p className='w-[30px] h-[30px] flex justify-center items-center'>
                {user && comment.creator === user.result._id && (
                  <FaTrashAlt
                    className='text-xs md:text-sm lg:text-md cursor-pointer text-pink-600 lg:scale-0 group-hover:lg:scale-100'
                    onClick={() => handleCommentDel(comment)}
                  />
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostDetailsComment
