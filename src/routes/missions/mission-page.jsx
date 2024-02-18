import * as React from 'react'
import {
  Box,
  Card,
  Typography, useColorScheme
} from '@mui/joy'
import SyntaxHighlighter from 'react-syntax-highlighter'

import {useMission} from '/src/contexts/MissionContext.jsx'
import {useApp} from '../../contexts/AppContext.jsx'
import MissionEditor from '../../components/mission/MissionEditor.jsx'
import {stackoverflowLight, vs2015} from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function MissionPage() {
  const {mode, systemMode} = useColorScheme()
  const highlighterTheme = mode === 'dark' || (mode === 'system' && systemMode === 'dark')
    ? vs2015
    : stackoverflowLight

  const {missionData, updateMissionData} = useMission()
  const {appData, updateAppData} = useApp()

  return (
    <Box sx={{
      display: {sm: 'flex', md: 'grid'},
      flexDirection: 'column',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto 1fr',
      gridTemplateAreas: `
        "header header"
        "content side"
      `,
      gap: '1rem',
      maxHeight: '100%',
    }}>
      <Typography level="h3" component="h1" sx={{
        gridArea: 'header',
        textAlign: 'center'
      }}>
        {missionData.ID && `Mission ${missionData.ID}` || "New mission"}
      </Typography>
      <MissionEditor missionData={missionData} updateMissionData={updateMissionData} sx={{
        gridArea: 'content',
        minWidth: 0,
        minHeight: 0,
      }}/>
      <Card
        variant="outlined"
        sx={{
          gridArea: 'side',
          padding: '1rem',
          minWidth: 0,
          minHeight: 0,
        }}>
        <Typography level="h4" component="h2">Result preview</Typography>
        <SyntaxHighlighter language="json" style={highlighterTheme}>
          {JSON.stringify(missionData, null, 2)}
        </SyntaxHighlighter>
        {/*<Box component={'pre'} sx={{*/}
        {/*  overflow: 'auto',*/}
        {/*  height: '100%',*/}
        {/*  margin: 0,*/}
        {/*  padding: '1rem',*/}
        {/*  bgcolor: 'background.level1',*/}
        {/*  borderRadius: '8px',*/}
        {/*}}>*/}
        {/*  {JSON.stringify(missionData, null, 2)}*/}
        {/*</Box>*/}
      </Card>
    </Box>
  )
}