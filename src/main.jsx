import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'

import '@fontsource/inter'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import MissionEditor from './routes/missions/mission-editor.jsx'
import {MissionProvider} from './routes/missions/data/MissionContext.jsx'
import SwinfoEditor from './routes/swinfo/swinfo-editor.jsx'
import Home from './routes/home/home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        errorElement: <Home/>,
        children: [
          {
            path: '/',
            element: <ErrorPage/>
          },
          {
            path: '/missions',
            element: <MissionProvider><MissionEditor/></MissionProvider>
          },
          {
            path: '/swinfo',
            element: <SwinfoEditor/>
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
