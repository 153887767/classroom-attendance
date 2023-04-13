import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/login'
import ErrorPage from '@/pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'a/:id',
        element: <div>children</div>,
        errorElement: <div>Oops! There was an error.</div>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])
