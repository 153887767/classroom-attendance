import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/login'
import ErrorPage from '@/pages/error'
import Lessons from '@/pages/lessons'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'lessons/list',
        element: <Lessons />
      },
      {
        path: 'lessons/form',
        element: <Lessons />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])
