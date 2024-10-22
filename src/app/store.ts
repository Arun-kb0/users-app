import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../features/admin/adminSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    admin: adminReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

