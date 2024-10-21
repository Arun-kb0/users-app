import { UserType } from '../../constant/types'

type Props = {
  user: UserType
}

const UserCard = ({ user }: Props) => {
  return (
    <section className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={user.photo} alt={user.name} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.email}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user.userId}</p>
      </div>
    </section>

  )
}

export default UserCard