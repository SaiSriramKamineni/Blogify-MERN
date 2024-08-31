import { combineReducers } from '@reduxjs/toolkit'

import postsReducer from '../slices/postsSlice'
import authReducer from '../slices/authSlice'
import loadingReducer from '../slices/loaderSlice'

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  loading: loadingReducer,
})

export default rootReducer
