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
    signingout: (state) => {
      state.signIn = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { signingIn, signingout } = userSlice.actions

export default userSlice.reducer
