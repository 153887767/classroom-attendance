import React from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  TimePicker,
  DatePicker,
  Message
} from '@arco-design/web-react'

import { addLesson } from '@/api/lesson'
import { requiredValidator } from '@/utils/requiredValidator'
import { isError } from '@/utils/errorRes'
import { Week } from '@/typings/interfaces/lesson'

const { Item } = Form
const { Group } = Checkbox
const { RangePicker: TimeRangePicker } = TimePicker
const { RangePicker: DateRangePicker } = DatePicker

const AddForm: React.FC = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (v: any) => {
    const res = await addLesson({
      lessonName: v.lessonName,
      day: v.day.join(','),
      time: v.time.join('~'),
      dateRange: v.dateRange.join('~'),
      location: v.location
    })
    if (!isError(res)) {
      Message.success('添加课程成功')
    } else {
      Message.warning(res?.message || '添加课程失败')
    }
    form.resetFields()
  }

  return (
    <Form form={form} className='w-[600px]' onSubmit={handleSubmit}>
      <Item
        label='课程名称'
        field='lessonName'
        rules={[{ validator: requiredValidator('请输入课程名称', true) }]}
      >
        <Input placeholder='请输入课程名称' />
      </Item>
      <Item
        label='上课时间'
        field='day'
        rules={[{ validator: requiredValidator('请选择上课时间') }]}
      >
        <Group>
          <Checkbox value={Week['星期一']}>{Week[1]}</Checkbox>
          <Checkbox value={Week['星期二']}>{Week[2]}</Checkbox>
          <Checkbox value={Week['星期三']}>{Week[3]}</Checkbox>
          <Checkbox value={Week['星期四']}>{Week[4]}</Checkbox>
          <Checkbox value={Week['星期五']}>{Week[5]}</Checkbox>
          <Checkbox value={Week['星期六']}>{Week[6]}</Checkbox>
          <Checkbox value={Week['星期日']}>{Week[7]}</Checkbox>
        </Group>
      </Item>
      <Item
        label='具体时间'
        field='time'
        rules={[{ validator: requiredValidator('请选择具体时间') }]}
      >
        <TimeRangePicker format='HH:mm' />
      </Item>
      <Item
        label='授课周期'
        field='dateRange'
        rules={[{ validator: requiredValidator('请选择授课周期') }]}
      >
        <DateRangePicker />
      </Item>
      <Item
        label='上课地点'
        field='location'
        rules={[{ validator: requiredValidator('请输入上课地点') }]}
      >
        <Input placeholder='请输入上课地点' />
      </Item>
      <Item wrapperCol={{ offset: 5 }}>
        <Button type='primary' htmlType='submit'>
          添加课程
        </Button>
      </Item>
    </Form>
  )
}

export default AddForm
