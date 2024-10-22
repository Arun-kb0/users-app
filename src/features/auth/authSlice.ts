import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh } from "./authApi";
import { StateType, UserType } from "../../constant/types";
import { RootState } from "../../app/store";

type AuthStateType = {
  user: UserType | undefined,
  accessToken: string | undefined,
  status: StateType,
  error: string | undefined
}

const initialState: AuthStateType = {
  user: undefined,
  accessToken: undefined,
  status: 'idle',
  error: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success'
        const { user, accessToken } = action.payload
        state.accessToken = accessToken
        state.user = user
      })

      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(refresh.fulfilled, (state, action) => {
        state.status = 'success'
        state.accessToken = action.payload.accessToken
      })

      .addCase(logout.fulfilled, (state) => {
        state.status = 'success'
        state = initialState
    })
  }
})

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthAccessToken = (state: RootState) => state.auth.accessToken
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthError = (state: RootState) => state.auth.error


export const {

} = authSlice.actions

export default authSlice.reducer