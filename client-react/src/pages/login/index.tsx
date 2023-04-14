import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Message } from '@arco-design/web-react'
import { IconUser, IconLock } from '@arco-design/web-react/icon'
import { requiredValidator } from '@/utils/requiredValidator'
import { login, register } from '@/api/teacher'
import { isError } from '@/utils/errorRes'

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
  const navigate = useNavigate()

  const handleSwitch = () => {
    form.resetFields()
    setIsLogin(!isLogin)
  }

  const handleSubmit = async (val: any) => {
    if (isLogin) {
      // 登录
      const res = await login(val)
      if (!isError(res)) {
        Message.success('登录成功')
        navigate('/')
      } else {
        Message.warning(res?.message || '登录失败')
      }
    } else {
      // 注册
      const res = await register(val)
      if (!isError(res)) {
        Message.success('注册成功')
        handleSwitch()
      } else {
        Message.warning(res?.message || '注册失败')
      }
    }
  }

  return (
    <>
      <div className='w-[400px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[6px] p-5 shadow bg-white'>
        <h1 className='text-2xl text-center mb-5'>课堂考勤</h1>
        <Form form={form} onSubmit={handleSubmit} {...formItemLayout}>
          <FormItem
            label='用户名'
            field='userName'
            rules={[
              {
                validator: requiredValidator('请输入用户名', true)
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
                validator: requiredValidator('请输入密码', true)
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
