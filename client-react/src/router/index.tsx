import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/login'
import ErrorPage from '@/pages/error'
import LessonList from '@/pages/lesson-list'

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
        path: 'lesson/form',
        element: <div>1</div>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])
