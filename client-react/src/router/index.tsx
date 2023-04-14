import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/login'
import ErrorPage from '@/pages/error'
import LessonList from '@/pages/lesson-list'
import LessonConfig from '@/pages/lesson-config'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'lesson/list',
        element: <LessonList />
      },
      {
        path: 'lesson/config',
        element: <LessonConfig />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])
