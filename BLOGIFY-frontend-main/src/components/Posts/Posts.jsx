import { useSelector } from 'react-redux'
import Post from './Post/Post'
import Loader from '../Loader'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Posts() {
  const { posts, pageInfo } = useSelector((state) => state.posts)
  const { loading } = useSelector((state) => state.loading)
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  // console.log('posts..........', posts)

  // const displaySearchResults = () => {
  //   let string = ''
  //   if (searchParams.get('title') && searchParams.get('title') !== 'none')
  //     string += `Title: ${searchParams.get('title')} `
  //   if (searchParams.get('tags') && searchParams.get('tags') !== 'none')
  //     string += `Tags: ${searchParams.get('tags')} `
  //   return string
  // }

  if (loading) {
    return (
      <div className='w-11/12 md:w-[60%] lg:w-[70%] grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
        <Loader />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className='w-11/12 md:w-[60%] lg:w-[70%] grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <div>
              <h2 className='text-3xl md:text-4xl text-center md:text-left font-extrabold text-pink-700'>
                NO
              </h2>
              <h2 className='text-3xl md:text-4xl text-center md:text-left font-extrabold text-pink-700'>
                {!location.search.includes('title') ? 'POSTS' : 'RESULTS'}
              </h2>
              <h2 className='text-3xl md:text-4xl text-center md:text-left font-extrabold text-blue-600'>
                FOUND
              </h2>
            </div>
          </div>
          {location.search.includes('title') && (
            <Link
              to='/posts'
              className='text-lg rounded-md text-pink-600 underline mt-2'
            >
              Back To All Posts
            </Link>
          )}
        </div>
      </div>
    )
  }

  if (location.search.includes('title')) {
    return (
      <div className='w-11/12 md:w-[60%] lg:w-[70%] flex flex-col gap-y-4'>
        <div className='w-full'>
          <h3 className='text-3xl font-semibold text-blue-600'>
            {pageInfo.totalPosts} Pos{pageInfo.totalPosts > 1 ? 'ts' : 't'}{' '}
            Found
          </h3>
          <Link
            to='/posts'
            className='text-lg rounded-md text-pink-600 underline'
          >
            Back To All Posts
          </Link>
        </div>
        <div className='w-full grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='w-11/12 md:w-[60%] lg:w-[70%] grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 mb-6'>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Posts
