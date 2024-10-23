import { createAsyncThunk } from "@reduxjs/toolkit"
import errorHandler from "../../errorHandler/errorHandler"
import axiosInstance from "../../constant/axiosInstance"
import { toast } from "react-toastify"

type LoginArgs = { email: string, password: string }
export const login = createAsyncThunk('/login', async ({ email, password }: LoginArgs) => {
  try {
    const user = await axiosInstance.post(
      '/auth/login',
      { email, password },
      { withCredentials: true }
    )
    toast('login success')
    return user.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const refresh = createAsyncThunk('/auth/refresh', async () => {
  try {
    const res = await axiosInstance.get('/auth/refresh', {
      withCredentials: true
    })
    return res.data
  } catch (error) {
    if (error instanceof Error)
      return error.message
  }
})

export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    const res = await axiosInstance.get('/auth/logout', {
      withCredentials: true
    })
    console.log(res)
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})
