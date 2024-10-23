import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { storage } from "../../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import configureAxios from "../../constant/configureAxios";
import { axiosPrivate } from "../../constant/axiosInstance";
import errorHandler from "../../errorHandler/errorHandler";

const uploadProfileImage = createAsyncThunk('/user/image', async (file: File, { dispatch , getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken, user } = state.auth
    const dispatchFunction = dispatch as AppDispatch
    if (!accessToken) throw new Error('no accessToken found')
    
    const allowedFileTypes = ['image/jpeg', 'image/png']
    if (!allowedFileTypes.includes(file.type)) {
      throw new Error(`Only jpg and png allowed`)
    }
    
    const maxSizeMB = 2
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (!file) throw new Error('no file selected')
    if (file.size > maxSizeBytes) {
      throw new Error(`Image size exceeds the ${maxSizeMB}MB limit`)
    }
    
    
    // * firebase
    const path = 'users/'
    const filename = file.name + Date().toString() 
    const imageRef = ref(storage, path + filename)
    const res = await uploadBytes(imageRef, file)
    const url = await getDownloadURL(res.ref)

    // * send request to update user with image url to backend 
    const removeInterceptors = await configureAxios(dispatchFunction, accessToken)
    const axiosRes = await axiosPrivate.post(`/profile?userId=${user?.userId}`, { photo: url })
    removeInterceptors()

    return axiosRes.data
  } catch (error) {
    return errorHandler(error)
  }
})


export {
  uploadProfileImage
}