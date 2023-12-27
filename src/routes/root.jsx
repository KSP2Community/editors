import {CssBaseline, CssVarsProvider} from '@mui/joy'
import Layout from '../components/Layout.jsx'
import Header from '../components/Header.jsx'
import React from 'react'
import {Outlet} from 'react-router-dom'

export default function Root() {
  return (
    <CssVarsProvider>
      <CssBaseline/>
      <Layout.Root>
        <Layout.Header>
          <Header/>
        </Layout.Header>
        <Layout.Main>
          <Outlet/>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  )
}
