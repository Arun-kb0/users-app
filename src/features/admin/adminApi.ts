import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../constant/axiosInstance";
import { UserType } from "../../constant/types";

export const fetchUsers = createAsyncThunk('/admin/fetchUsers', async () => {
  try {
    const res = await axiosInstance.get('/admin/')
    if (res.status !== 200) {
      throw new Error(' no data found ')
    }
    return res.data
  } catch (error) {
    if (error instanceof Error)
      return error.message
  }
})

export const createUserApi = createAsyncThunk('/admin/createUser', async (user:UserType) => {
  try {
    const res = await axiosInstance.post('/admin/user',user)
    return res.data
  } catch (error) {
    if (error instanceof Error)
      return error.message
  }
})