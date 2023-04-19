import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Descriptions,
  Message,
  Button,
  Modal
} from '@arco-design/web-react'
import AraleQRCode from 'arale-qrcode'

import { getLessons } from '@/api/lesson'
import { isError } from '@/utils/errorRes'
import Spin from '@/components/spin'
import { ILessonList, ILessonListItem, Week } from '@/typings/interfaces/lesson'
import { useStore } from '@/store'

const LessonList: React.FC = () => {
  const [lessons, setLessons] = useState<ILessonList>()
  const [modalVisible, setModalVisible] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const userName = useStore((state) => state.userName)

  useEffect(() => {
    ;(async function () {
      const res = await getLessons()
      if (!isError(res)) {
        setLessons(res)
      } else {
        Message.warning(res?.message || '获取课程列表失败')
      }
    })()
  }, [])

  const handleClick = (id: number) => {
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

  const getDescData = (data: ILessonListItem) => {
    return [
      {
        label: '课程编码',
        value: data.id
      },
      {
        label: '上课时间',
        value: `${data.day.map((item) => Week[item]).join('，')}，${data.time}`
      },
      {
        label: '上课地点',
        value: data.location
      },
      {
        label: '授课周期',
        value: data.dateRange
      },
      {
        label: '授课教师',
        value: userName
      },
      {
        label: '课程二维码',
        value: (
          <Button type='outline' onClick={() => handleClick(data.id)}>
            获取
          </Button>
        )
      }
    ]
  }

  if (!lessons) {
    return <Spin />
  }

  return (
    <>
      <div className='mb-4'>
        课程总数：
        <span className='font-semibold text-blue-500'>{lessons.count}</span>
      </div>
      <div>
        {lessons.lessonList.map((item) => (
          <Card
            className='transition-transform hover:-translate-y-1 mb-3'
            hoverable
            key={item.id}
          >
            <Descriptions
              colon=' :'
              layout='inline-horizontal'
              title={item.lessonName}
              data={getDescData(item)}
            />
          </Card>
        ))}
      </div>
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

export default LessonList
