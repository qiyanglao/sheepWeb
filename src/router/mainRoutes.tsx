import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import LazyImportComponent from '@/components/LazyImportComponent'

const importFn = require.context('./modules', true, /\.tsx$/)
const moduleRoutes: RouteObject[] = []

importFn.keys().forEach(item => {
  Object.values(importFn(item))
    .flat(Infinity)
    .map(el => moduleRoutes.push(el!))
})

export const mainRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/layout'))} />,
    children: [
      {
        path: '/admin',
        element: <Navigate to='/admin/home' />
      },
      {
        path: '/admin/home',
        meta: { title: '首页', icon: <HomeOutlined /> },
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/admin/home'))} />
      },
      ...moduleRoutes,
      {
        path: '*',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/notFound'))} />
      }
    ]
  }
]
