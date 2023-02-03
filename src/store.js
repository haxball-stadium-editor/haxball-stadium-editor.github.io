import { configureStore } from '@reduxjs/toolkit'
import mainModeReducer from './reducers/mainModeSlice'
import stadiumReducer from './reducers/stadiumSlice'
import versionReducer from './reducers/versionSlice'

export default configureStore({
  reducer: {
    stadium: stadiumReducer,
    mainMode: mainModeReducer,
    version: versionReducer
  },
})