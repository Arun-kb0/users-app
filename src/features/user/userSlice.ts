import { createSlice } from "@reduxjs/toolkit"
import { StateType, UserType } from "../../constant/types"
import { fetchUsers } from "./userApi"
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




const userSlice = createSlice({
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



  }
})


export const selectAllUsers = (state: RootState) => state.user.users
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserError = (state: RootState) => state.user.error

export const {

} = userSlice.actions

export default userSlice.reducer