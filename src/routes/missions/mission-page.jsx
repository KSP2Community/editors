import {
  Box,
  Card,
  Typography, useColorScheme
} from '@mui/joy'
import SyntaxHighlighter from 'react-syntax-highlighter'

import {useMission} from '/src/contexts/MissionContext.jsx'
import MissionEditor from '../../components/mission/MissionEditor.jsx'
import {stackoverflowLight, vs2015} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {stringifyMission} from '../../utils/missions.js'

export default function MissionPage() {
  const {mode, systemMode} = useColorScheme()
  const highlighterTheme = mode === 'dark' || (mode === 'system' && systemMode === 'dark')
    ? vs2015
    : stackoverflowLight

  const {missionData} = useMission()

  return (
    <Box sx={{
      display: {sm: 'flex', md: 'grid'},
      flexDirection: 'column',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto 1fr',
      gridTemplateAreas: `"content side"`,
      gap: '1rem',
      maxHeight: {sm: 'auto', md: '100%'},
    }}>
      <MissionEditor sx={{
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
        <SyntaxHighlighter language="json" style={highlighterTheme} customStyle={{
          padding: '0.5rem',
          borderRadius: '0.5rem',
        }}>
          {stringifyMission(missionData)}
        </SyntaxHighlighter>
      </Card>
    </Box>
  )
}