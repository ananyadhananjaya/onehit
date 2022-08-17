import { configureStore } from '@reduxjs/toolkit'
import linksReducer from '../reducers/linksReducer'
import mathReducer from '../reducers/mathReducer'
import userReducer from '../reducers/userReducer'

export default configureStore({
  reducer: {
    counter: mathReducer,
    user: userReducer,
    link: linksReducer
  }
})
