import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../constant/axiosInstance";
import { UserType } from "../../constant/types";
import { toast } from "react-toastify";
import errorHandler from "../../errorHandler/errorHandler";

export const fetchUsers = createAsyncThunk('/admin/fetchUsers', async () => {
  try {
    const res = await axiosInstance.get('/admin/')
    if (res.status !== 200) {
      throw new Error(' no data found ')
    }
    return res.data
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
      return error.message
    }
  }
})

export const createUserApi = createAsyncThunk('/admin/createUser', async (user: UserType) => {
  try {
    const res = await axiosInstance.post('/admin/user', user)
    if (res.status !== 200) throw new Error('create user failed')
    toast('user created')
    console.log(res.data)
    return res.data.user
  } catch (error) {
    return errorHandler(error)
  }
})

type EditUserApiArgs = { user: UserType, userId: string }
export const editUserApi = createAsyncThunk('/admin/editUser', async ({ user, userId }: EditUserApiArgs) => {
  try {
    const res = await axiosInstance.patch(`/admin/user?userId=${userId}`, user)
    if (res.status !== 200) throw new Error('update user failed')
    toast('user updated')
    return res.data.user
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
      return error.message
    }
  }
})

export const deleteUserApi = createAsyncThunk('/admin/deleteUser', async (userId: string) => {
  try {
    const res = await axiosInstance.delete(`/admin/user?userId=${userId}`)
    if (res.status !== 200) throw new Error('update user failed')
    toast('user deleted')
    console.log(res.data)
    return res.data.user
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
      return error.message
    }
  }
})
