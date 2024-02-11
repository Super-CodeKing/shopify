import { configureStore } from '@reduxjs/toolkit'
import preOrderReducer from './reducers/PreOrder'

const reducer = {
  preorder: preOrderReducer
}

export const store = configureStore({
  reducer: reducer
})