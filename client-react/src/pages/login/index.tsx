import React, { useState } from 'react'
import { Form, Input, Button } from '@arco-design/web-react'
import { IconUser, IconLock } from '@arco-design/web-react/icon'
import { requiredValidator } from '../../utils/requiredValidator'

const { Item: FormItem } = Form
const { Password } = Input

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const [isLogin, setIsLogin] = useState(true)

  const handleSwitch = () => {
    form.resetFields()
    setIsLogin(!isLogin)
  }

  return (
    <>
      <div className='w-[400px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[6px] p-5 shadow bg-white'>
        <h1 className='text-2xl text-center mb-5'>课堂考勤</h1>
        <Form
          form={form}
          onSubmit={(v) => {
            console.log(v)
          }}
          {...formItemLayout}
        >
          <FormItem
            label='用户名'
            field='username'
            rules={[
              {
                validator: requiredValidator('请输入用户名')
              }
            ]}
          >
            <Input placeholder='请输入用户名' prefix={<IconUser />} />
          </FormItem>
          <FormItem
            label='密码'
            field='password'
            rules={[
              {
                validator: requiredValidator('请输入密码')
              }
            ]}
          >
            <Password placeholder='请输入密码' prefix={<IconLock />} />
          </FormItem>
          <div className='flex justify-center'>
            <Button type='outline' htmlType='submit'>
              {isLogin ? '登录' : '注册'}
            </Button>
          </div>
        </Form>
        <div className='flex justify-end'>
          <Button type='text' onClick={handleSwitch}>
            {isLogin ? '去注册' : '去登录'}
          </Button>
        </div>
      </div>
      <div className='w-screen h-screen bg-gradient-to-b from-slate-50 to-teal-100'></div>
    </>
  )
}

export default Login
