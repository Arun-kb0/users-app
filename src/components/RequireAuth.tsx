import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { roles } from '../constant/enums'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../features/auth/authSlice'

type Props = {
  allowedRoles: number[]
}

const RequireAuth = ({ allowedRoles }: Props) => {
  // * chcek user and role and allow access
  const user = useSelector(selectAuthUser)
  const location = useLocation()

  return (
    user && allowedRoles.find(role=> user.role === role)
      ? <Outlet />
      : user
        ? < Navigate
          to='/unauthorized'
          state={{ from: location }}
          replace />
        : <Navigate
          to='/login'
          state={{ from: location }}
          replace />
  )
}

export default RequireAuth