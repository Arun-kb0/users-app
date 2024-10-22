import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../features/auth/authSlice'
import UserProfileCard from '../components/UserProfileCard'

type Props = {}

const Profile = (props: Props) => {
  const user = useSelector(selectAuthUser)

  return (
    <main className='main-section'>
      <div className='space-y-4 my-5'>
        <h1 className='text-xl font-semibold text-blue-300 capitalize'>profile</h1>
        {user && <UserProfileCard user={user} />}
      </div>
    </main>
  )
}

export default Profile