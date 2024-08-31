import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  editPost: null,
  pageInfo: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts(state, value) {
      state.posts = value.payload
    },
    addNewPost(state, value) {
      state.posts = [...state.posts, value.payload]
    },
    setUpdatePost(state, value) {
      state.posts = state.posts.map((post) =>
        post._id === value.payload._id ? value.payload : post
      )
    },
    setEditPost(state, value) {
      state.editPost = value.payload
    },
    setDeletedPost(state, value) {
      state.posts = state.posts.filter((post) => post._id !== value.payload)
    },
    setPageInfo(state, value) {
      state.pageInfo = value.payload
    },
  },
})

export const {
  setPosts,
  addNewPost,
  setEditPost,
  setUpdatePost,
  setDeletedPost,
  setPageInfo,
} = postsSlice.actions

export default postsSlice.reducer
