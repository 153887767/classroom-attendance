import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  TimePicker,
  DatePicker,
  Message,
  AutoComplete
} from '@arco-design/web-react'
import debounce from 'lodash/debounce'

import { addLesson } from '@/api/lesson'
import { getPrompt } from '@/api/location'
import { requiredValidator } from '@/utils/requiredValidator'
import { isError } from '@/utils/errorRes'
import { Week } from '@/typings/interfaces/lesson'

const { Item } = Form
const { Group } = Checkbox
const { RangePicker: TimeRangePicker } = TimePicker
const { RangePicker: DateRangePicker } = DatePicker
const { Option } = AutoComplete

const AddForm: React.FC = () => {
  const [form] = Form.useForm()
  const [prompt, setPrompt] = useState<any>([])
  const [buildingInfo, setBuildingInfo] = useState<{
    buildingName: string
    geocode: string
  }>()

  const handleSubmit = async (v: any) => {
    if (
      !buildingInfo ||
      buildingInfo.buildingName !== form.getFieldValue('building')
    ) {
      Message.warning('请从下拉框中选择教学楼')
      return
    }
    const res = await addLesson({
      lessonName: v.lessonName,
      day: v.day.join(','),
      time: v.time.join('~'),
      dateRange: v.dateRange.join('~'),
      location: buildingInfo.buildingName + v.classroom,
      geocode: buildingInfo.geocode
    })
    if (!isError(res)) {
      Message.success('添加课程成功')
    } else {
      Message.warning(res?.message || '添加课程失败')
    }
    form.resetFields()
  }

  const handleSearch = async (inputValue: any) => {
    const res = await getPrompt(inputValue)
    if (!isError(res)) {
      setPrompt(res.tips)
    }
  }

  const handleClick = (v: any) => {
    setBuildingInfo({
      buildingName: v.name,
      geocode: v.location
    })
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
        label='上课星期'
        field='day'
        rules={[{ validator: requiredValidator('请选择上课星期') }]}
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
        label='上课时间'
        field='time'
        rules={[{ validator: requiredValidator('请选择上课时间') }]}
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
        label='教学楼'
        field='building'
        rules={[{ validator: requiredValidator('请选择教学楼') }]}
      >
        <AutoComplete
          placeholder='请输入关键词后下拉选择'
          onSearch={debounce(handleSearch, 500)}
          filterOption={false}
        >
          {prompt.map((item: any) => (
            <Option
              key={item.id}
              value={item.name}
              onClick={() => handleClick(item)}
            >
              {item.name}
            </Option>
          ))}
        </AutoComplete>
      </Item>
      <Item
        label='教室'
        field='classroom'
        rules={[{ validator: requiredValidator('请输入教室号', true) }]}
      >
        <Input placeholder='请输入教室号' />
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
