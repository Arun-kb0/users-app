import { Link } from 'react-router-dom'

type Props = {
  handleLogout: () => void
}

const AdminNav = ({ handleLogout }: Props) => {
  return (
    <nav className='flex gap-4 capitalize text-green-500 text-lg font-semibold'>
      <h1 className='text-red-600 text-x'>Admin Panel</h1>
      <Link to="/admin">Home</Link>
      <Link to="/admin/create">create</Link>
      <button onClick={handleLogout}> Logout</button>
    </nav>
  )
}

export default AdminNav