import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Header from './header'
import Menu from './menu'
import Main from './main'

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/lessons/list')
    }
  }, [location, navigate])

  return (
    <div className='bg-slate-100'>
      <Header />
      <div className='flex'>
        <Menu />
        <div className='flex-1 flex justify-center my-4'>
          <Main pathname={location.pathname}>
            <Outlet />
          </Main>
        </div>
      </div>
    </div>
  )
}

export default Layout
