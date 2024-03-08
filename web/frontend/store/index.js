import { configureStore } from '@reduxjs/toolkit'
import preOrderReducer from './reducers/PreOrder'
import comingSoonReducer from './reducers/ComingSoon'
import requestStockReducer from './reducers/RequestStock'

const reducer = {
  preorder: preOrderReducer,
  comingsoon: comingSoonReducer,
  requeststock: requestStockReducer
}

export const store = configureStore({
  reducer: reducer
})