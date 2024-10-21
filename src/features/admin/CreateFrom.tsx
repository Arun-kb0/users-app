import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { UserType } from '../../constant/types'
import { useDispatch } from 'react-redux'
import { createUserApi, editUserApi } from './adminApi'
import { AppDispatch } from '../../app/store'
import { toast } from 'react-toastify'

type Props = {
  user?: UserType
}

const CreateFrom = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset: resetForm
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    console.log("data")
    console.log(data)
    const { confirmPassword, ...rest } = data
    const userData = { photo: '', ...rest } as UserType
    if (user) {
      dispatch(editUserApi({ user: userData, userId: user.userId }))
      return
    }
    dispatch(createUserApi(userData))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 min-w-[300px]'>
      <h2 className='title'>{user ? "edit user" : "create user"} </h2>
      <div className="grid space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'enter name'}
            defaultValue={user && user.name}
            {...register('name', {
              required: 'name is required',
              pattern: {
                value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                message: 'Invalid name'
              }
            })}
          />
          {errors.name &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.name.message)}</p>
          }
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='enter email'
            defaultValue={user && user.email}
            {...register('email', {
              required: 'email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email'
              }
            })}
          />
          {errors.email &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.email.message)}</p>
          }
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type={user ? "text" : "password"}
            defaultValue={user && user.password}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('password', {
              required: 'password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Invalid password'
              }
            })}
          />
          {errors.password &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.password.message)}</p>
          }
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            defaultValue={user && user.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('confirmPassword', {
              required: 'password do not match',
              validate: (value) =>
                value === watch('password') || "password do not match"
            })}
          />
          {errors.confirmPassword &&
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {String(errors.confirmPassword.message)}</p>
          }
        </div>

      </div>

      <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 capitalize">
        {user ? "edit" : "create"}
      </button>

      {user &&
        <button onClick={() => resetForm()} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Reset
          </span>
        </button>
      }

    </form>
  )
}

export default CreateFrom
