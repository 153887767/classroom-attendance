import React from 'react'
import { Tabs } from '@arco-design/web-react'

import AddForm from './components/add-form'
import DelForm from './components/del-form'

const { TabPane } = Tabs

const LessonConfig: React.FC = () => {
  return (
    <Tabs defaultActiveTab='1' size='large' destroyOnHide>
      <TabPane key='1' title='添加课程'>
        <AddForm />
      </TabPane>
      <TabPane key='2' title='删除课程'>
        <DelForm />
      </TabPane>
    </Tabs>
  )
}

export default LessonConfig
