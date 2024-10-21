import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateType, UserType } from "../../constant/types"
import { createUserApi, deleteUserApi, editUserApi, fetchUsers } from "./adminApi"
import { RootState } from "../../app/store"

type UserStateType = {
  users: UserType[],
  currentUser?: UserType
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
  reducers: {
    getUserById: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      const user = state.users.find(user => user.userId === userId)
      return { ...state, currentUser: user }
    }
  },

  // * inject builder
  extraReducers: (builder) => {
    builder.

      addCase(fetchUsers.pending, (state) => {
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

      .addCase(createUserApi.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.status = 'success'
        state.users.push(action.payload)
      })

      .addCase(editUserApi.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.status = 'success'
        const user = action.payload
        state.users =  state.users.filter(item => item.userId !== user.userId)
        state.users.push(user)
      })

      .addCase(deleteUserApi.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.status = 'success'
        const { userId } = action.payload
        state.users =  state.users.filter(user => user.userId !== userId)
      })


  }
})


export const selectAllUsers = (state: RootState) => state.admin.users
export const selectCurrentUser = (state: RootState) => state.admin.currentUser
export const selectUserStatus = (state: RootState) => state.admin.status
export const selectUserError = (state: RootState) => state.admin.error

export const {
  getUserById
} = adminSlice.actions

export default adminSlice.reducer