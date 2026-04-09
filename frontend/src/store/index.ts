import { configureStore } from '@reduxjs/toolkit'
import auth_slice from "./features/auth/auth_slice"

export const store = configureStore({
  reducer: {
    auth_slice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store