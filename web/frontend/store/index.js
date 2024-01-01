import { configureStore } from '@reduxjs/toolkit'
import settingReducer from "./reducers/PreOrder";

const reducer = {

}

export const store = configureStore({
  reducer: reducer,
  devTools: true
})