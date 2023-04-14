import React from 'react'
import { Card } from '@arco-design/web-react'
import { pathToDesc } from '@/router/constants'

interface IProps {
  children: React.ReactNode
  pathname: string
}

const Main: React.FC<IProps> = ({ children, pathname }) => {
  return (
    <Card title={pathToDesc[pathname]} className='w-[950px]'>
      {children}
    </Card>
  )
}

export default Main
