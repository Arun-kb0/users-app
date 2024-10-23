import React from 'react'
import { useSelector } from 'react-redux'
import { selectSearchResult, selectUserError, selectUserStatus } from '../features/admin/adminSlice'
import UserCard from '../features/admin/UserCard'
import Spinner from '../components/Spinner'

type Props = {}

const SearchResults = (props: Props) => {
  const searchResult = useSelector(selectSearchResult)
  const status = useSelector(selectUserStatus)
  const error = useSelector(selectUserError)

  let content: React.ReactNode
  if (status === 'loading') {
    content = <div className='center-contents'>  <Spinner/> </div>
  } else if (status === 'success') {
    content = searchResult.length !== 0
      ? searchResult.map(user => (
        <UserCard key={user.userId} user={user} />
      ))
      : <div className='center-contents'>
        <h1 className='text-xl font-semibold'>No users found </h1>
       </div>
  } else if (status === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className='main-section'>
      <div className='px-4'>
        <h2 className='title'>Search Results </h2>

        <div className='flex gap-4 flex-wrap'>
          {content}
        </div>

      </div>
    </section>
  )
}

export default SearchResults