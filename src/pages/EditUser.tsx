import React, { useEffect, useState } from 'react'
import CreateFrom from '../features/admin/CreateFrom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, selectCurrentUser } from '../features/admin/adminSlice'


const EditUser = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const user = useSelector(selectCurrentUser)
  const [reset, setReset] = useState(false)

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId))
      console.log('reset click')
    }
  }, [userId, reset])

  return (
    <section className='main-section'>
      {user &&
        <CreateFrom
          user={user}
        />}
    </section >
  )
}

export default EditUser