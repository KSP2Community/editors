import * as React from 'react'
import {
  Box,
  Card,
  Typography
} from '@mui/joy'

import {useMission} from '/src/contexts/MissionContext.jsx'
import MissionEditor from '../../components/missions/MissionEditor.jsx'

function getMaxStageID(missionStages) {
  return missionStages.reduce((max, stage) => {
    return stage.StageID > max ? stage.StageID : max
  }, 0)
}

export default function MissionPage() {
  const {missionData, updateMissionData} = useMission()

  return (
    <Box>
      <Typography level="h3" component="h1" sx={{
        gridArea: 'header',
        textAlign: 'center',
        mb: '1rem',
      }}>
        {missionData.ID && `Mission ${missionData.ID}` || "New mission"}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: {sm: 'column', md: 'row'},
        gap: '1rem',
        padding: '1rem',
      }}>
        <MissionEditor missionData={missionData} updateMissionData={updateMissionData}/>
        <Card
          variant="outlined"
          sx={{
            gridArea: 'side',
            padding: '1rem',
            flex: '0 0 50%',
            minWidth: 0,
            minHeight: 0,
          }}>
          <Typography level="h4" component="h2">Result preview</Typography>
          <pre style={{
            overflow: 'auto',
            maxHeight: '100%',
          }}>
          {JSON.stringify(missionData, null, 2)}
        </pre>
        </Card>
      </Box>
    </Box>
  )
}