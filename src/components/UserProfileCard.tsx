import React from 'react'
import { StateType, UserType } from '../constant/types'
import { FieldValues, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { uploadProfileImage } from '../features/user/userApi'
import { AppDispatch } from '../app/store'
import Spinner from './Spinner'

type Props = {
  user: UserType,
  status : StateType
}

const UserProfileCard = ({ user,status }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    const file = data.file[0] as File
    console.log(file)
    dispatch(uploadProfileImage(file))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full min-w-[550px] p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.photo} alt={user.name} />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.role}</span>
        <div className="flex justify-center mt-4 md:mt-6">
          <input
            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="default_size"
            type="file"
            {...register('file')}
          />
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
          {status==='loading' && <Spinner/>}
          Upload
        </button>
      </div>

    </form>

  )
}

export default UserProfileCard