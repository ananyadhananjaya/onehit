import { configureStore } from '@reduxjs/toolkit'
import mathReducer from '../reducers/mathReducer'
import userReducer from '../reducers/userReducer'

export default configureStore({
  reducer: {
    counter: mathReducer,
    user: userReducer
  }
})
