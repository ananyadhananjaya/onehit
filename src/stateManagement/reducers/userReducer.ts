import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signIn: false
  },
  reducers: {
    signingIn: (state) => {
      state.signIn = true
    },
    signingOot: (state) => {
      state.signIn = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { signingIn, signingOot } = userSlice.actions

export default userSlice.reducer
