import React from 'react'
import { Route, Routes } from 'react-router-dom'
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




const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer theme='dark' />

      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={[roles.user]} />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[roles.admin]} />} >
          <Route path='/admin'  >
            <Route index element={<Users />} />
            <Route path='create' element={<CreateUser />} />
            <Route path='edit/:userId' element={<EditUser />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
