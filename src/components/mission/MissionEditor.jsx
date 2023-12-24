import * as React from 'react'
import {AccordionGroup, Box, Card, IconButton, Tooltip, Typography} from '@mui/joy'
import {FiPlus} from 'react-icons/fi'

import {useMission} from '/src/MissionContext.jsx'
import DropdownInput from '../inputs/DropdownInput.jsx'
import TextInput from '../inputs/TextInput.jsx'
import Toggle from '../inputs/Toggle.jsx'
import AutocompleteInput from '../inputs/AutocompleteInput.jsx'
import StageEditor from './stage/StageEditor.jsx'
import BranchEditor from './branch/BranchEditor.jsx'

import missionTypes from '/src/data/mission/mission-type.json'
import missionStates from '/src/data/mission/mission-state.json'
import missionOwners from '/src/data/mission/mission-owner.json'
import missionGranters from '/src/data/mission/mission-granter-keys.json'
import triumphLoopVideos from '/src/data/mission/triumph-loop-video-keys.json'
import {stageDefaults} from '/src/data/defaults.js'

export default function MissionEditor() {
  const {missionData, updateMissionData} = useMission()

  return (
    <Box sx={{
      display: {
        sm: 'flex',
        md: 'grid'
      },
      flexDirection: 'column',
      gridTemplateAreas: '"header header" "content side"',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      padding: '1rem',
    }}>
      <Typography level="h3" component="h1" sx={{
        gridArea: 'header',
        textAlign: 'center',
        mb: '1rem',
      }}>
        {missionData.ID && `Mission ${missionData.ID}` || "New mission"}
      </Typography>

      <Card
        variant="outlined"
        sx={{
          gridArea: 'content',
          padding: '1rem',
        }}>
        <Typography level="h4" component="h2">Mission parameters</Typography>

        <TextInput
          name="ID"
          label="Mission ID"
          value={missionData.ID}
          onChange={updateMissionData}
        />
        <TextInput
          name="name"
          label="Name Localization Key"
          value={missionData.name}
          onChange={updateMissionData}
        />
        <TextInput
          name="description"
          label="Description Localization Key"
          value={missionData.description}
          onChange={updateMissionData}
        />
        <DropdownInput
          name="type"
          label="Type"
          options={missionTypes}
          value={missionData.type}
          onChange={updateMissionData}
        />
        <DropdownInput
          name="Owner"
          label="Owner"
          options={missionOwners}
          value={missionData.Owner}
          onChange={updateMissionData}
        />
        <DropdownInput
          name="state"
          label="State"
          options={missionStates}
          value={missionData.state}
          onChange={updateMissionData}
        />
        <Toggle
          name="Hidden"
          label="Hidden"
          value={missionData.Hidden}
          onChange={updateMissionData}
        />
        <AutocompleteInput
          name="MissionGranterKey"
          label="Mission Granter"
          options={missionGranters}
          value={missionData.MissionGranterKey}
          onChange={updateMissionData}
        />
        <AutocompleteInput
          name="TriumphLoopVideoKey"
          label="Triumph Loop Video"
          options={triumphLoopVideos}
          value={missionData.TriumphLoopVideoKey}
          onChange={updateMissionData}
        />
        <Toggle
          name="VisibleRewards"
          label="Rewards Visible"
          value={missionData.VisibleRewards}
          onChange={updateMissionData}
        />
        <DropdownInput
          name="uiDisplayType"
          label="UI Display Type"
          options={["Default", "Video", "Flight", "VAB", "VAB_Flight"]}
          value={missionData.uiDisplayType}
          onChange={updateMissionData}
        />

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography level="h4" component="h2">Stages</Typography>
          <Tooltip title="Add stage">
            <IconButton onClick={() => updateMissionData("missionStages", [...missionData.missionStages, {
              "StageID": missionData.missionStages.length,
              ...stageDefaults
            }])}>
              <FiPlus/>
            </IconButton>
          </Tooltip>
        </Box>

        <AccordionGroup>
          {missionData.missionStages.length ? missionData.missionStages.map((stage, index) => (
            <StageEditor
              key={index}
              stage={stage}
              updateStageData={(name, value) => {
                const newStages = [...missionData.missionStages]
                newStages[index][name] = value
                const maxStageID = Math.max(...newStages.map(stage => stage.StageID))
                updateMissionData("maxStageID", maxStageID)
                updateMissionData("missionStages", newStages)
              }}
              deleteStage={() => {
                const newStages = [...missionData.missionStages]
                newStages.splice(index, 1)
                updateMissionData("missionStages", newStages)
              }}
            />
          )) : <Typography sx={{
            textAlign: 'center',
            color: 'text.tertiary',
          }}>No stages</Typography>}
        </AccordionGroup>

        <Typography level="h4" component="h2">Content Branches</Typography>

        {missionData.ContentBranches.map((branch, index) => (
          <BranchEditor
            key={index}
            branch={branch}
            updateBranchData={(name, value) => {
              const newBranches = [...missionData.ContentBranches]
              newBranches[index][name] = value
              updateMissionData("ContentBranches", newBranches)
            }}
          />
        ))}
      </Card>

      <Card
        variant="outlined"
        sx={{
          gridArea: 'side',
          padding: '1rem',
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
  )
}