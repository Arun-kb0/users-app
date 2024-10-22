import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

type Props = {
  allowedRoles: number[]
}

const RequireAuth = ({ allowedRoles }: Props) => {
  // * chcek user and role and allow access
  const auth = { user: 'aurn', roles: [2001] }
  const location = useLocation()

  return (
    auth?.roles.find(role => allowedRoles.includes(role))
      ? <Outlet />
      : auth?.user
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