import React from 'react'
import { Avatar, Dropdown, Menu } from '@arco-design/web-react'
import { IconUser, IconArrowLeft } from '@arco-design/web-react/icon'
import logo from '@/assets/images/logo.svg'

const dropList = (
  <Menu>
    <Menu.Item key='1'>
      <IconArrowLeft className='mr-2' />
      <span>退出系统</span>
    </Menu.Item>
  </Menu>
)

const Header: React.FC = () => {
  return (
    <div className='w-full h-16 bg-white  px-9 py-4 shadow flex justify-between items-center'>
      <div className='flex cursor-pointer items-center'>
        <img src={logo} alt='' className='w-8 h-8' />
        <span className='text-xl font-semibold ml-2'>课堂考勤系统</span>
      </div>
      <div className='flex items-center mr-5'>
        <span className='text-base mr-4'>欢迎回来，张三</span>
        <Dropdown
          droplist={dropList}
          position='bottom'
          trigger={['click', 'hover']}
        >
          <Avatar className='bg-sky-500/75 w-8 h-8 cursor-pointer'>
            <IconUser />
          </Avatar>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
