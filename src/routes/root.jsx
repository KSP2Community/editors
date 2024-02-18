import {CssBaseline, CssVarsProvider} from '@mui/joy'
import * as Layout from '../components/Layout.jsx'
import Header from '../components/Header.jsx'
import React from 'react'
import {Outlet} from 'react-router-dom'
import {AppProvider} from '../contexts/AppContext.jsx'

export default function Root() {
  return (
    <CssVarsProvider>
      <CssBaseline/>
      <AppProvider>
        <Layout.Root>
          <Layout.Header>
            <Header/>
          </Layout.Header>
          <Layout.Main sx={{
            maxHeight: '100%',
            overflow: 'auto',
          }}>
            <Outlet/>
          </Layout.Main>
        </Layout.Root>
      </AppProvider>
    </CssVarsProvider>
  )
}
