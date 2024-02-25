import { Outlet } from 'react-router-dom'

import { useLogoutMutation, useMeQuery } from '@/service/auth/auth.service'

import s from './header.module.scss'

const Header = () => {
  const { isLoading } = useMeQuery()
  const { data: me } = useMeQuery()
  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
  }

  return (
    <div className={s.appWrapper}>
      <div className={s.header}>
        {me?.resultCode === 1 ? (
          <div>Welcome to TodoList</div>
        ) : (
          <>
            <div>Id: {me?.data.id}</div>
            <div>Email: {me?.data.email}</div>
            <div>Login: {me?.data.login}</div>
            <button onClick={logoutHandler}>Sign Out</button>
          </>
        )}
      </div>
      <main>{isLoading ? <div>LOADING</div> : <Outlet />}</main>
    </div>
  )
}

export default Header
