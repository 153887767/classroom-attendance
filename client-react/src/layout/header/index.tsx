import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Menu, Message } from '@arco-design/web-react'
import { IconUser, IconArrowLeft } from '@arco-design/web-react/icon'
import { shallow } from 'zustand/shallow'

import logo from '@/assets/images/logo.svg'
import { getUserInfo } from '@/api/teacher'
import { isError } from '@/utils/errorRes'
import { useStore } from '@/store'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const { userName, setInfo } = useStore(
    (state) => ({
      userName: state.userName,
      setInfo: state.setInfo
    }),
    shallow
  )

  useEffect(() => {
    getUserInfo().then((res) => {
      if (!isError(res)) {
        setInfo(res)
      } else {
        Message.warning(res?.message || '获取用户信息失败')
      }
    })
  }, [setInfo])

  const handleLogout = () => {
    // 删除客户端token即可退出
    // 如果想要让此token彻底失效，可以在服务端添加redis黑名单
    localStorage.removeItem('token')
    navigate('/login')
    Message.success('退出成功')
  }

  const dropList = (
    <Menu>
      <Menu.Item key='1' onClick={handleLogout}>
        <IconArrowLeft className='mr-2' />
        <span>退出系统</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='w-full h-16 bg-white  px-9 py-4 shadow flex justify-between items-center'>
      <div
        onClick={() => {
          navigate('/')
        }}
        className='flex cursor-pointer items-center'
      >
        <img src={logo} alt='' className='w-8 h-8' />
        <span className='text-xl font-semibold ml-2'>课堂考勤系统</span>
      </div>
      <div className='flex items-center mr-5'>
        <span className='text-base mr-4'>
          <span className='text-sky-400'>{userName}</span>
          &nbsp;老师，欢迎回来
        </span>
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
