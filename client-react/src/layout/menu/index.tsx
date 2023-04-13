import { Menu } from '@arco-design/web-react'
import { IconApps, IconBulb } from '@arco-design/web-react/icon'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const MainMenu = () => {
  return (
    <div className='mt-px shadow w-60 h-[calc(100vh-65px)]'>
      <Menu
        defaultOpenKeys={['0', '1']}
        defaultSelectedKeys={['0_0']}
        className='h-full'
      >
        <SubMenu
          key='0'
          title={
            <>
              <IconApps /> 课程管理
            </>
          }
        >
          <MenuItem key='0_0'>课程列表</MenuItem>
          <MenuItem key='0_1'>添加课程</MenuItem>
          <MenuItem key='0_2'>移除课程</MenuItem>
        </SubMenu>
        <SubMenu
          key='1'
          title={
            <>
              <IconBulb /> 考勤管理
            </>
          }
        >
          <MenuItem key='1_0'>当前课堂</MenuItem>
          <MenuItem key='1_1'>考勤小计</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default MainMenu
