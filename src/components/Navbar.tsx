import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <header className='flex justify-center items-center bg-gray-700'>
      <nav className='flex gap-4 capitalize text-green-500 text-lg font-semibold'>
        <h1 className='text-red-600 text-x'>Admin Panel</h1>
        <Link to="/admin">Home</Link>
        <Link to="/admin/create">create</Link>
      </nav>
    </header>
  )
}

export default Navbar