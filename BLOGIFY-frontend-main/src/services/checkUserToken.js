import { isExpired } from 'react-jwt'

export function checkUserToken() {
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).token
    : null

  if (!token || isExpired(token)) return false
  else return true
}
