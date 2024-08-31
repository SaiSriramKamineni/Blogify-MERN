import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../slices/loaderSlice'
import Loader from '../components/Loader'
import * as api from '../api'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { updatePost } from '../services/posts'
import { logUserOut } from '../slices/authSlice'
import { checkUserToken } from '../services/checkUserToken'
import PostDetailsComment from '../components/Posts/Post/PostDetailsComment'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function PostDetails() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const postId = location.pathname.split('/')[2]
  const { loading } = useSelector((state) => state.loading)
  const { user } = useSelector((state) => state.auth)
  const [postData, setPostData] = useState(null)
  // console.log('post Id', postId)

  const getPost = async () => {
    dispatch(setLoading(true))
    try {
      const { data } = await api.getPost(postId)
      dispatch(setLoading(false))
      setPostData(data)
      // console.log('post data', data)
    } catch (error) {
      // console.log('get post error', error)
      dispatch(setLoading(false))
    }
  }

  const handleOnLike = (likes) => {
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
    let post = postData
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
    setPostData(updatedPost)
    dispatch(updatePost(updatedPost, post._id))
  }

  const handleCommentDel = (delComment) => {
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
    let post = postData
    let updatedPost = {}

    if (post.comments.map((comment) => comment._id).includes(delComment._id)) {
      updatedPost = {
        ...post,
        comments: post.comments.filter(
          (comment) => comment._id !== delComment._id
        ),
      }
      setPostData(updatedPost)
      dispatch(updatePost(updatedPost, post._id))
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  if (loading || postData === null) {
    return (
      <div className='w-11/12 md:w-[60%] lg:w-[70%] grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
        <Loader />
      </div>
    )
  } else {
    const { title, message, name, tags, selectedFile, createdAt, likes } =
      postData

    return (
      <div className='flex flex-col md:flex-row max-w-[1000px] mx-auto gap-x-6 items-start justify-between md:mb-6'>
        <div className='transparentCard w-full max-w-[500px] md:max-w-[unset] mx-auto md:mx-0 md:w-[50%] p-6 flex flex-col-reverse gap-y-6 md:gap-y-0'>
          {/* text */}
          <div className='w-full max-w-[500px] mx-auto'>
            <div>
              <p className='text-3xl font-semibold mt-4'>{title}</p>
              {tags && (
                <div className='flex items-center gap-x-2 mt-1'>
                  {tags.map((tg, index) => (
                    <p key={index} className='text-gray-500 text-lg'>
                      #{tg}
                    </p>
                  ))}
                </div>
              )}
              <p className='max-w-[98%] text-justify leading-7 break-words w-full my-4'>
                {message}
              </p>
            </div>
            <div className='flex justify-between'>
              <div
                className='flex items-center space-x-1 cursor-pointer'
                onClick={() => handleOnLike(likes)}
              >
                {user && likes.length > 0 && likes.includes(user.result._id) ? (
                  <AiFillLike className='text-blue-600 text-xl' />
                ) : (
                  <AiOutlineLike className='text-blue-600 text-xl' />
                )}
                <p className='text-xl'>{likes.length}</p>
              </div>
              <div>
                <p className='text-gray-700 text-right text-xl flex items-center gap-x-2'>
                  <span className='font-bold text-black'>Created By:</span>
                  {name}
                </p>
                <p className='text-gray-700 text-right text-xl flex items-center gap-x-2'>
                  <span className='font-bold text-black'>Posted :</span>
                  {timeAgo.format(new Date(createdAt))}
                </p>
              </div>
            </div>
          </div>
          {/* image */}
          <div className='w-full max-w-[500px] mx-auto'>
            <p
              onClick={() => navigate(-1)}
              className='mb-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-800'
            >
              <IoIosArrowBack /> Go Back
            </p>
            <div className='w-full h-max flex justify-center items-center'>
              <LazyLoadImage
                alt='post'
                effect='blur'
                src={
                  selectedFile !== ''
                    ? selectedFile
                    : '../Assets/placeholder.webp'
                }
                className='w-full rounded-lg object-contain shadow-xl'
              />
            </div>
          </div>
        </div>
        <PostDetailsComment
          user={user}
          id={postId}
          post={postData}
          handleCommentDel={handleCommentDel}
        />
      </div>
    )
  }
}

export default PostDetails
