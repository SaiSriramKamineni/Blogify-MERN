import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    // check if custom token or socialAuth token
    const isCustomAuth = token.length < 500

    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log('Auth Middleware Error...............', error)
  }
}

export default auth
