import { configureStore } from '@reduxjs/toolkit'
import preOrderReducer from './reducers/PreOrder'
import comingSoonReducer from './reducers/ComingSoon'

const reducer = {
  preorder: preOrderReducer,
  comingsoon: comingSoonReducer
}

export const store = configureStore({
  reducer: reducer
})