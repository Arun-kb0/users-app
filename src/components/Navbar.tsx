import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../features/auth/authSlice'
import { roles } from '../constant/enums'
import UserNav from './UserNav'
import AdminNav from './AdminNav'
import { logout } from '../features/auth/authApi'
import { AppDispatch } from '../app/store'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector(selectAuthUser)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className='flex justify-center items-center bg-gray-700'>
      {user && user.role === roles.user
        ? <UserNav handleLogout={handleLogout} />
        : <AdminNav handleLogout={handleLogout} />
      }
    </header>
  )
}

export default Navbar