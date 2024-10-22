import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Login from './pages/Login'



const App = () => {
  return (
    <>
      <Navbar/>
      <ToastContainer theme='dark'/>

      <Routes>
        <Route path='/'>
          <Route index element={ <h1>Home</h1> } />
          <Route path='/login' element={<Login/>} />
        </Route>

        <Route path='/admin'  >
          <Route index element={<Users />} />
          <Route path='create' element={<CreateUser />} />
          <Route path='edit/:userId' element={<EditUser />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
