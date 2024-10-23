import { Link } from 'react-router-dom'
import { UserType } from '../../constant/types'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteUserApi } from './adminApi';
import { AppDispatch } from '../../app/store';
import nouser from '../../assets/nouser-photo.jpg'

type Props = {
  user: UserType
}

const UserCard = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  
  const handleDelete = () => {
    if (user) {
      dispatch(deleteUserApi(user.userId))
      
    }
  }

  return (
    <section className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a className=''> 
        <img className="rounded-t-lg w-full max-h-[200px]  h-auto object-cover " src={user.photo ? user.photo : nouser } alt={user.name} />
      </a>
      <div className="p-5">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.email}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.userId}</p>
        <div className='flex justify-center gap-2 ' >
          <Link to={`/admin/edit/${user.userId}`} >
            <FaEdit size={24} className='text-orange-400' />
          </Link>
          <button onClick={handleDelete}>
            <MdDelete size={24} className='text-red-500' />
          </button>
        </div>
      </div>
    </section>

  )
}

export default UserCard