import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'link',
  initialState: {
    links: []
  },
  reducers: {
    addLink: (state: any, action: any) => {
      state.links = []
      state.links.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addLink } = userSlice.actions

export default userSlice.reducer
