import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <>
      <ToastContainer theme='dark'/>

      <Routes>
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
