import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) ?? null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      localStorage.setItem('user', JSON.stringify(value.payload))
      state.user = value.payload
    },
    logUserOut(state) {
      localStorage.removeItem('user')
      state.user = null
    },
  },
})

export const { setUser, logUserOut } = authSlice.actions

export default authSlice.reducer
