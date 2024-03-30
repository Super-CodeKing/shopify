import { configureStore } from '@reduxjs/toolkit'
import preOrderReducer from './reducers/PreOrder'
import comingSoonReducer from './reducers/ComingSoon'
import requestStockReducer from './reducers/RequestStock'
import dashboardReducer from './reducers/Dashboard'

const reducer = {
  preorder: preOrderReducer,
  comingsoon: comingSoonReducer,
  requeststock: requestStockReducer,
  dashboard: dashboardReducer
}

export const store = configureStore({
  reducer: reducer
})