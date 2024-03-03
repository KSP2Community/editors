import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'

import '@fontsource/inter'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import MissionPage from './routes/missions/mission-page.jsx'
import {MissionProvider} from './contexts/MissionContext.jsx'
import SwinfoPage from './routes/swinfo/swinfo-page.jsx'
import Home from './routes/home/home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          {
            path: '/',
            element: <Home/>
          },
          {
            path: '/missions',
            element: <MissionProvider><MissionPage/></MissionProvider>
          },
          {
            path: '/swinfo',
            element: <SwinfoPage/>
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
