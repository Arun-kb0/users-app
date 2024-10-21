import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../constant/axiosInstance";

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

export const createUser = createAsyncThunk('/admin/createUser', async (user) => {
  try {
    
  } catch (error) {
    if (error instanceof Error)
      return error.message
  }
})