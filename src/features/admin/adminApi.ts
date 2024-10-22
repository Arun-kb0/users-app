import { createAsyncThunk } from "@reduxjs/toolkit";
import  { axiosPrivate } from "../../constant/axiosInstance";
import { UserType } from "../../constant/types";
import { toast } from "react-toastify";
import errorHandler from "../../errorHandler/errorHandler";
import { AppDispatch, RootState } from "../../app/store";
import configureAxios from "../../constant/configureAxios";

export const fetchUsers = createAsyncThunk('/admin/fetchUsers', async (_, {dispatch,getState}) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken 
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')

    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.get('/admin/')
    removeInterceptors()

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

export const createUserApi = createAsyncThunk('/admin/createUser', async (user: UserType,{dispatch,getState}) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')

    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.post('/admin/user',user)
    removeInterceptors()

    if (res.status !== 200) throw new Error('create user failed')
    toast('user created')
    console.log(res.data)
    return res.data.user
  } catch (error) {
    return errorHandler(error)
  }
})

type EditUserApiArgs = { user: UserType, userId: string }
export const editUserApi = createAsyncThunk('/admin/editUser', async ({ user, userId }: EditUserApiArgs,{dispatch,getState}) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')

    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.patch(`/admin/user?userId=${userId}`, user)
    removeInterceptors()

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

export const deleteUserApi = createAsyncThunk('/admin/deleteUser', async (userId: string,{dispatch,getState}) => {
  try {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error(' no accessToken found ')

    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const res = await axiosPrivate.delete(`/admin/user?userId=${userId}`)
    removeInterceptors()

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
