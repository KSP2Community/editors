import {
  CssBaseline,
  CssVarsProvider,
} from '@mui/joy'
import React from 'react'

import MissionEditor from './components/mission/MissionEditor.jsx'
import {MissionProvider} from './MissionContext.jsx'
import Layout from './components/Layout.jsx'
import Header from './components/Header.jsx'

export default function App() {
  return (
    <MissionProvider>

      <CssVarsProvider>
        <CssBaseline/>
        {/*{drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation/>
        </Layout.SideDrawer>
      )}*/}
        <Layout.Root>
          <Layout.Header>
            <Header/>
          </Layout.Header>
          {/*<Layout.SideNav>
          <Navigation/>
        </Layout.SideNav>*/}
          {/*<Layout.SidePane>
        </Layout.SidePane>*/}
          <Layout.Main>
            <MissionEditor/>
          </Layout.Main>
        </Layout.Root>
      </CssVarsProvider>
    </MissionProvider>
  )
}
