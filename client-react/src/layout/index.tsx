import React, { useEffect, Suspense } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import Spin from '@/components/spin'
import Header from './header'
import Menu from './menu'
import Main from './main'

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/lesson/list')
    }
  }, [pathname, navigate])

  return (
    <div className='bg-slate-100'>
      <Header />
      <div className='flex'>
        <Menu pathname={pathname} />
        <div className='flex-1 flex justify-center my-4'>
          <Main pathname={pathname}>
            <Suspense fallback={<Spin />}>
              <Outlet />
            </Suspense>
          </Main>
        </div>
      </div>
    </div>
  )
}

export default Layout
