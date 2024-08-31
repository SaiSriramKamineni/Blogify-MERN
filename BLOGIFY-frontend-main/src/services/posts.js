import * as api from '../api'

import {
  setPosts,
  addNewPost,
  setUpdatePost,
  setDeletedPost,
  setPageInfo,
} from '../slices/postsSlice'

import { setLoading } from '../slices/loaderSlice'

export function getPosts(pageNumber = 1) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const { data } = await api.fetchPosts(pageNumber)
      dispatch(setPosts(data.results))
      let pageInfo = {}
      pageInfo.totalPosts = data.totalPosts
      if (data.next) {
        pageInfo.next = data.next
      }
      if (data.previous) {
        pageInfo.previous = data.previous
      }
      dispatch(setPageInfo(pageInfo))
      dispatch(setLoading(false))
    } catch (error) {
      // console.log('get posts error............', error)
      dispatch(setLoading(false))
    }
  }
}

export function createPost(newPost) {
  return async (dispatch) => {
    try {
      const { data } = await api.createPost(newPost)
      dispatch(addNewPost(data))
    } catch (error) {
      // console.log('create post error...........', error)
    }
  }
}

export function getPostsBySearch(searchQuery, page) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    // console.log(searchQuery)
    try {
      const { data } = await api.getPostsBySearch(searchQuery, page)
      // console.log('search results.........', data)
      dispatch(setPosts(data.results))
      let pageInfo = {}
      pageInfo.totalPosts = data.totalPosts
      if (data.next) {
        pageInfo.next = data.next
      }
      if (data.previous) {
        pageInfo.previous = data.previous
      }
      dispatch(setPageInfo(pageInfo))
      dispatch(setLoading(false))
    } catch (error) {
      // console.log('search result error...........', error)
    }
  }
}

export function updatePost(updatedPost, id) {
  return async (dispatch) => {
    try {
      const { data } = await api.updatePost(updatedPost, id)
      dispatch(setUpdatePost(data))
    } catch (error) {
      // console.log('update post error...........', error)
    }
  }
}

export function deletePost(id) {
  return async (dispatch) => {
    try {
      api.deletePost(id)
      dispatch(setDeletedPost(id))
    } catch (error) {
      // console.log('delete post error............ ', error)
    }
  }
}
