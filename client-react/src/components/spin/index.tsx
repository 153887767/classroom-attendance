import React from 'react'
import { Spin as ArcoSpin } from '@arco-design/web-react'

const Spin: React.FC = () => {
  return (
    <div className='h-[500px] flex justify-center items-center'>
      <ArcoSpin />
    </div>
  )
}

export default Spin
