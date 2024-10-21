import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/admin'  >
          <Route index element={<Users />} />
          <Route path='create' element={<CreateUser />} />
          <Route path='edit' element={<EditUser />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
