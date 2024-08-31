import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [
      {
        creator: String,
        comment: String,
        createdAt: {
          type: 'Date',
          default: new Date().toISOString(),
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: 'Date',
    default: new Date().toISOString(),
  },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage
