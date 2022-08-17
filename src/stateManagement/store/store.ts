import { configureStore } from '@reduxjs/toolkit'
import mathReducer from '../reducers/mathReducer'

export default configureStore({
  reducer: {
    counter: mathReducer
  }
})
