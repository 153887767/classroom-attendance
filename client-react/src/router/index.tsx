import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Spin from '@/components/spin'

const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const ErrorPage = lazy(() => import('@/pages/error'))
const LessonList = lazy(() => import('@/pages/lesson-list'))
const LessonConfig = lazy(() => import('@/pages/lesson-config'))
const StatisticsCurrent = lazy(() => import('@/pages/statistics-current'))
const StatisticsAll = lazy(() => import('@/pages/statistics-all'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Spin />}>
        <Layout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'lesson/list',
        element: <LessonList />
      },
      {
        path: 'lesson/config',
        element: <LessonConfig />
      },
      {
        path: '/statistics/current',
        element: <StatisticsCurrent />
      },
      {
        path: '/statistics/all',
        element: <StatisticsAll />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Spin />}>
        <Login />
      </Suspense>
    )
  }
])
