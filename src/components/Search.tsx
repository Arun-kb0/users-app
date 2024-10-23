import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import { searchUser } from '../features/admin/adminApi';
import { toast } from 'react-toastify';
import { selectUserStatus } from '../features/admin/adminSlice';


const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector(selectUserStatus)
  
  const  {
    register,
    handleSubmit
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    console.log(data)
    dispatch(searchUser(data.searchText))
    navigate('/admin/search')
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="max-w-md mx-auto md:w-full sm:w-60">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <input
          {...register('searchText', {required:true})}
          type="search"
          id="default-search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search users ...."
          required
        />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <CiSearch size="20px"/>
        </button>
      </div>
    </form>

  )
}

export default Search