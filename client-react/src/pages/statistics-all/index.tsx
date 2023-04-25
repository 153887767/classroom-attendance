import React, { useState } from 'react'
import {
  Button,
  Message,
  Table,
  TableColumnProps,
  Image,
  InputNumber,
  Card,
  Descriptions,
  Tooltip
} from '@arco-design/web-react'
import { IconQuestionCircle } from '@arco-design/web-react/icon'

import { getAttendanceInfo } from '@/api/statistics'
import { isError } from '@/utils/errorRes'
import { IAttendanceInfo } from '@/typings/interfaces/statistics'

const columns: TableColumnProps[] = [
  {
    title: '姓名',
    dataIndex: 'userName'
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    render: (col) => (col ? col : '未填写')
  },
  {
    title: '照片',
    dataIndex: 'faceImg',
    render: (col) =>
      col ? <Image width={40} height={40} src={col} alt='' /> : '未上传'
  },
  {
    title: '考勤次数',
    dataIndex: 'count'
  }
]

const StatisticsAll: React.FC = () => {
  const [lessonId, setLessonId] = useState<number>()
  const [attendanceInfo, setAttendanceInfo] = useState<IAttendanceInfo>()

  const handleClick = async () => {
    if (!lessonId) {
      Message.info('输入课程编码')
      return
    }
    const res = await getAttendanceInfo(lessonId)
    if (!isError(res)) {
      setAttendanceInfo(res)
    } else {
      Message.warning(res?.message || '获取考勤列表失败')
    }
  }

  const descData = [
    {
      label: '课程名称',
      value: attendanceInfo?.lessonName
    },
    {
      label: (
        <>
          <span>已授课次数</span>
          <Tooltip content='包含今日课程'>
            <IconQuestionCircle className='cursor-pointer ml-1' />
          </Tooltip>
        </>
      ),
      value: attendanceInfo?.teachingDays
    },
    {
      label: '总课时数',
      value: attendanceInfo?.totalDays
    },
    {
      label: '学生总数',
      value: attendanceInfo?.list?.length
    }
  ]

  return (
    <>
      <div className='mb-3'>
        <InputNumber
          onChange={setLessonId}
          className='w-80 mr-2'
          placeholder='请输入课程编码'
          min={1}
        />
        <Button type='primary' onClick={handleClick}>
          查询
        </Button>
      </div>
      <Card className='mb-3' hoverable>
        <Descriptions
          colon=' :'
          layout='inline-horizontal'
          title='课程信息'
          data={descData}
        />
      </Card>
      <Table
        rowKey='id'
        columns={columns}
        data={attendanceInfo?.list}
        pagination={false}
      />
    </>
  )
}

export default StatisticsAll
