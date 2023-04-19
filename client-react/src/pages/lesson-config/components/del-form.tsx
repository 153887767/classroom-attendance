import React from 'react'
import { Form, Button, InputNumber, Message } from '@arco-design/web-react'

import { delLesson } from '@/api/lesson'
import { requiredValidator } from '@/utils/requiredValidator'
import { isError } from '@/utils/errorRes'

const { Item } = Form

const DelForm: React.FC = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (v: { id: number }) => {
    const res = await delLesson({ id: v.id })
    if (!isError(res)) {
      Message.success('删除课程成功')
    } else {
      Message.warning(res?.message || '删除课程失败')
    }
    form.resetFields()
  }

  return (
    <Form form={form} className='w-[600px]' onSubmit={handleSubmit}>
      <Item
        label='课程编码'
        field='id'
        rules={[
          {
            validator: requiredValidator('请输入课程编码')
          }
        ]}
      >
        <InputNumber placeholder='请输入课程编码' />
      </Item>
      <Item wrapperCol={{ offset: 5 }}>
        <Button type='primary' htmlType='submit'>
          删除课程
        </Button>
      </Item>
    </Form>
  )
}

export default DelForm
