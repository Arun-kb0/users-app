import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, selectUserError, selectUserStatus } from '../features/admin/adminSlice'
import { fetchUsers } from '../features/admin/adminApi'
import { AppDispatch } from '../app/store'
import UserCard from '../features/admin/UserCard'
import { toast } from 'react-toastify'

const Users = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectAllUsers)
  const error = useSelector(selectUserError)
  const status = useSelector(selectUserStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
    console.log("status ", status)
    console.log("error ", error)
    console.log(users)
  }, [status, dispatch])



  let content: React.ReactNode
  if (status === 'loading') {
    content = <p>Loading....</p>
  } else if (status === 'success') {
    content = users.map(user => (
      <UserCard key={user.userId} user={user} />
    ))
  } else if (status === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className='main-section'>
      <div className='px-4'>
        <h2 className='title'>Users</h2>

        <div className='flex gap-4 flex-wrap'>
          {content}
        </div>

      </div>
    </section>
  )
}

export default Users