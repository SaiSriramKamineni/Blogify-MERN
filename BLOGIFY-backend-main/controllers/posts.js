import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'
import db from 'mongoose'

export const getPosts = async (req, res) => {
  const limit = parseInt(req.query?.limit) || 6
  const page = parseInt(req.query?.page) || 1

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  try {
    const totalDocuments = await PostMessage.countDocuments().exec()

    results.totalPosts = totalDocuments

    if (endIndex < totalDocuments) {
      results.next = {
        page: page + 1,
        limit: limit,
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      }
    }

    results.results = await PostMessage.aggregate(
      [{ $sort: { createdAt: -1 } }, { $skip: startIndex }, { $limit: limit }],
      { allowDiskUse: true }
    )

    res.status(200).json(results)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage(post)
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query

  const limit = parseInt(req.query?.limit) || 6
  const page = parseInt(req.query?.page) || 1

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  try {
    const title = new RegExp(searchQuery, 'i')
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    })

    results.totalPosts = posts.length

    if (endIndex < posts.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      }
    }

    results.results = posts.slice(startIndex, endIndex)

    // can't figure out how this works lol 🙂
    // results.results = await PostMessage.aggregate(
    //   [
    //     { $match: { title: title, tags: { $in: tags.split(',') } } },
    //     { $sort: { createdAt: -1 } },
    //     { $skip: startIndex },
    //     { $limit: limit },
    //   ],
    //   { allowDiskUse: true }
    // )

    res.json(results)
  } catch (error) {
    res.status(404).json({ message: error.message })
    console.log('search results error.......', error)
  }
}

export const getPost = async (req, res) => {
  const { id: _id } = req.params
  if (!mongoose.isValidObjectId(_id))
    res.status(404).json({ message: 'No Post with id found!' })
  try {
    const post = await PostMessage.findById(_id)
    res.json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
    console.log('get post error..........', error)
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const updPost = req.body

  if (!mongoose.isValidObjectId(_id))
    res.status(404).json({ message: 'No Post with id found!' })

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, updPost, {
    new: true,
  })

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.isValidObjectId(_id))
    res.status(404).json({ message: 'No Post with id found!' })

  await PostMessage.findByIdAndRemove(_id)

  res.json({ message: 'Post Deleted Successfully!' })
}
