import { useDispatch, useSelector } from "react-redux"
import { refresh } from "../features/auth/authApi"
import { selectAuthAccessToken, selectAuthUser } from "../features/auth/authSlice"
import { axiosPrivate } from "../constant/axiosInstance"
import { useEffect } from "react"
import { AppDispatch } from "../app/store"

const useAxiosPrivate = () => {
  const dispatch = useDispatch<AppDispatch>()
  const accessToken = useSelector(selectAuthAccessToken)

  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true

          const resultAction = dispatch(refresh())
          if (refresh.fulfilled.match(resultAction)) {
            const newAccessToken = resultAction.payload.accessToken
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosPrivate(prevRequest)
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseInterceptors)
    }

  }, [accessToken, refresh])

  return axiosPrivate
}

export default useAxiosPrivate