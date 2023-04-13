import React from 'react'
import Header from './header'
import Menu from './menu'

const Layout: React.FC = () => {
  return (
    <div className='bg-slate-100'>
      <Header />
      <Menu />
    </div>
  )
}

export default Layout
