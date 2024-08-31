import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { setEditPost } from '../../../slices/postsSlice'
import { deletePost, updatePost } from '../../../services/posts'
import { logUserOut } from '../../../slices/authSlice'
import { checkUserToken } from '../../../services/checkUserToken'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function Post({ post }) {
  const {
    createdAt,
    creator,
    name,
    likes,
    message,
    selectedFile,
    tags,
    title,
  } = post
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleOnLike = () => {
    if (!user) {
      toast.error('You are not Logged In!')
      return
    }

    // checks if login token is still valid
    if (!checkUserToken()) {
      toast.info('Session Expired!')
      dispatch(logUserOut())
      return
    }

    let updatedPost = {}
    const existingLike = likes.filter((like) => like === user.result._id)
    if (existingLike.length === 0) {
      updatedPost = { ...post, likes: [...likes, user.result._id] }
    } else {
      updatedPost = {
        ...post,
        likes: likes.filter((like) => like !== user.result._id),
      }
    }
    dispatch(updatePost(updatedPost, post._id))
  }

  const handleDelete = () => {
    // checks if login token is still valid
    if (!checkUserToken()) {
      toast.info('Session Expired!')
      dispatch(logUserOut())
      return
    }
    dispatch(deletePost(post._id))
    toast.success('Deleted Successfully!')
  }

  return (
    <div className='w-[95%] max-w-[280px] transparentCardBoost rounded-lg overflow-hidden shadow-lg'>
      <div className='h-[140px] relative after:absolute after:z-40 after:contents-[``] after:top-0 after:left-0 after:w-full after:h-full after:bg-cardGradient postImage'>
        <LazyLoadImage
          alt='post'
          effect='blur'
          src={
            selectedFile !== ''
              ? selectedFile
              : '../../../../Assets/placeholder.webp'
          }
          height='140px'
        />
        <div className='absolute flex justify-between items-center z-50 top-4 left-4 right-4'>
          <div className='text-white'>
            <p>{name}</p>
            <p className='text-sm'>{timeAgo.format(new Date(createdAt))}</p>
          </div>
          {user && user.result._id === creator && (
            <AiOutlineEdit
              className='text-white text-xl cursor-pointer transition-all duration-300 hover:scale-125'
              onClick={() => dispatch(setEditPost(post))}
            />
          )}
        </div>
      </div>
      <div className='p-4 flex flex-col justify-between'>
        {tags.length > 0 && (
          <div className='flex space-x-2 flex-wrap'>
            {tags.slice(0, 3).map((tag, index) => (
              <p key={index} className='text-sm text-gray-500 font-normal'>
                #{tag}
              </p>
            ))}
            {tags.length > 3 && <p>...</p>}
          </div>
        )}
        <div className='my-2 h-[110px] flex flex-col space-y-2'>
          <Link to={`/post/${post._id}`}>
            <h4 className='font-semibold text-lg leading-5 hover:underline hover:underline-offset-2'>
              {title.length > 30 ? `${title.substring(0, 30) + '...'}` : title}
            </h4>
          </Link>
          <p className='text-gray-600 leading-5 break-words'>
            {message.length > 80
              ? `${message.substring(0, 80) + '...'}`
              : message}
            {/* TEST CHARCACTERS - 120 */}
            {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula. */}
          </p>
        </div>
        <div className='flex justify-between items-center flex-wrap mt-2'>
          <div
            className='flex items-center space-x-1 cursor-pointer'
            onClick={handleOnLike}
          >
            {user && likes.length > 0 && likes.includes(user.result._id) ? (
              <AiFillLike className='text-blue-600' />
            ) : (
              <AiOutlineLike className='text-blue-600' />
            )}
            <p>{likes.length}</p>
          </div>
          {user && user.result._id === creator && (
            <AiOutlineDelete
              className='text-blue-600 cursor-pointer text-lg'
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
