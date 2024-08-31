import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
