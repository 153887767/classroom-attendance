import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from '@arco-design/web-react'
import { IconApps, IconBulb } from '@arco-design/web-react/icon'
import { pathToDesc } from '@/router/constants'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

interface IProps {
  pathname: string
}

const MainMenu: React.FC<IProps> = ({ pathname }) => {
  const navigate = useNavigate()

  return (
    <div className='mt-px shadow h-[calc(100vh-65px)]'>
      <Menu
        hasCollapseButton
        defaultOpenKeys={['0', '1']}
        selectedKeys={[pathToDesc[pathname]?.menuKey]}
        style={{ width: 260, height: '100%' }}
      >
        <SubMenu
          key='0'
          title={
            <>
              <IconApps /> 课程管理
            </>
          }
        >
          <MenuItem key='0_0' onClick={() => navigate('/lesson/list')}>
            课程列表
          </MenuItem>
          <MenuItem key='0_1' onClick={() => navigate('/lesson/config')}>
            课程设置
          </MenuItem>
        </SubMenu>
        <SubMenu
          key='1'
          title={
            <>
              <IconBulb /> 考勤管理
            </>
          }
        >
          <MenuItem key='1_0' onClick={() => navigate('/statistics/current')}>
            当前课程
          </MenuItem>
          <MenuItem key='1_1' onClick={() => navigate('/statistics/all')}>
            考勤统计
          </MenuItem>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default MainMenu
