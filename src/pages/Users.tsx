import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, selectUserError, selectUserStatus } from '../features/admin/adminSlice'
import { fetchUsers } from '../features/admin/adminApi'
import { AppDispatch } from '../app/store'

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
      <p key={user.userId}> {user.name} </p>
    ))
  } else if (status === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className='main-section'>
      <div>
        <h2 className='title'>Users</h2>
        {content}
      </div>
    </section>
  )
}

export default Users