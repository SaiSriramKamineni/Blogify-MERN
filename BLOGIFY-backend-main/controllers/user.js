import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser)
      return res.status(404).json({ message: 'User Does Not Exist' })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid Credentials' })

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1hr' }
    )

    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong!' })
  }
}

export const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser)
      return res.status(400).json({ message: 'User Already Exists!' })

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords Do Not Match!' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({ email, name, password: hashedPassword })

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1hr',
      }
    )

    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong!' })
  }
}
