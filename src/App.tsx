import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { roles } from './constant/enums'
import Unauthorized from './pages/Unauthorized'
import { useDispatch } from 'react-redux'
import { refresh } from './features/auth/authApi'
import { AppDispatch } from './app/store'
import SearchResults from './pages/SearchResults'




const App = () => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    dispatch(refresh())
  },[])

  return (
    <>
     {location.pathname !== '/login'  && <Navbar />}
      <ToastContainer theme='dark' />

      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized  message='Unauthorized' desc="you don't have permission to access this route" />} />

        <Route element={<RequireAuth role={roles.user} />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route element={<RequireAuth role={roles.admin} />} >
          <Route path='/admin'  >
            <Route index element={<Users />} />
            <Route path='create' element={<CreateUser />} />
            <Route path='edit/:userId' element={<EditUser />} />
            <Route path='/admin/search' element={<SearchResults/>} />
          </Route>
        </Route>

        <Route path="*" element={<Unauthorized message='not found' desc="this route doesn't exists" />} />
      </Routes>
    </>
  )
}

export default App
