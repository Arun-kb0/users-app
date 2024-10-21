import { createSlice } from "@reduxjs/toolkit"
import { StateType, UserType } from "../../constant/types"
import { createUserApi, fetchUsers } from "./adminApi"
import { RootState } from "../../app/store"

type UserStateType = {
  users: UserType[],
  status: StateType
  error: string | undefined
}

const initialState: UserStateType = {
  users: [],
  status: 'idle',
  error: undefined
}




const adminSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  // * inject builder
  extraReducers: (builder) => {
    builder.

      addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'success'
        state.users = action.payload.users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(createUserApi.fulfilled, (state, action) => {
        state.status = 'success'
        state.users.push(action.payload)
      })


  }
})


export const selectAllUsers = (state: RootState) => state.admin.users
export const selectUserStatus = (state: RootState) => state.admin.status
export const selectUserError = (state: RootState) => state.admin.error

export const {

} = adminSlice.actions

export default adminSlice.reducer