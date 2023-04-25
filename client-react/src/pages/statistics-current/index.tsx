import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  Descriptions,
  Empty,
  Message,
  Modal,
  Table,
  TableColumnProps,
  Image
} from '@arco-design/web-react'
import { IconCheck, IconClose } from '@arco-design/web-react/icon'
import AraleQRCode from 'arale-qrcode'
import dayjs from 'dayjs'

import { getCurrentLesson, getAttendanceInfo } from '@/api/statistics'
import { isError } from '@/utils/errorRes'
import {
  IAttendanceInfo,
  ICurrentLesson
} from '@/typings/interfaces/statistics'

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
    title: '考勤状态',
    dataIndex: 'lastAttendance',
    render: (col) =>
      dayjs().isSame(dayjs(col), 'day') ? (
        <span>
          已完成
          <IconCheck style={{ color: '#66CD00', marginLeft: 6 }} />
        </span>
      ) : (
        <span>
          未完成
          <IconClose style={{ color: 'red', marginLeft: 6 }} />
        </span>
      )
  }
]

const StatisticsCuttent: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<ICurrentLesson>()
  const [attendanceInfo, setAttendanceInfo] = useState<IAttendanceInfo>()
  const [modalVisible, setModalVisible] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async function () {
      const res = await getCurrentLesson()
      if (!isError(res)) {
        setCurrentLesson(res)
      } else {
        Message.warning(res?.message || '获取当前课程失败')
      }
    })()
  }, [])

  useEffect(() => {
    ;(async function () {
      if (currentLesson?.id) {
        const res = await getAttendanceInfo(currentLesson.id)
        if (!isError(res)) {
          setAttendanceInfo(res)
        } else {
          Message.warning(res?.message || '获取考勤列表失败')
        }
      }
    })()
  }, [currentLesson])

  const showQRcode = (id: number) => {
    setModalVisible(true)
    const svgElement = new AraleQRCode({
      render: 'svg',
      text: String(id),
      size: 256
    })
    setTimeout(() => {
      ;(ref.current as HTMLDivElement).innerHTML = ''
      ;(ref.current as HTMLDivElement).appendChild(svgElement)
    })
  }

  if (!currentLesson?.id) {
    return (
      <div className='h-96 flex items-center'>
        <Empty description='当前没有课程' />
      </div>
    )
  }

  const descData = [
    {
      label: '课程编码',
      value: currentLesson.id
    },
    {
      label: '上课时间',
      value: `今天 ${currentLesson.time}`
    },
    {
      label: '上课地点',
      value: currentLesson.location
    },
    {
      label: '学生总数',
      value: attendanceInfo?.list?.length
    },
    {
      label: '课程二维码',
      value: (
        <Button type='outline' onClick={() => showQRcode(currentLesson.id)}>
          获取
        </Button>
      )
    }
  ]

  return (
    <>
      <Card className='mb-3' hoverable>
        <Descriptions
          colon=' :'
          layout='inline-horizontal'
          title={currentLesson?.lessonName}
          data={descData}
        />
      </Card>
      <Table
        rowKey='id'
        columns={columns}
        data={attendanceInfo?.list}
        pagination={false}
      />
      <Modal
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        className='w-80'
      >
        <div ref={ref} className='flex justify-center'></div>
      </Modal>
    </>
  )
}

export default StatisticsCuttent
