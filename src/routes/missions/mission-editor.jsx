import * as React from 'react'
import {
  accordionDetailsClasses,
  AccordionGroup, accordionSummaryClasses,
  Box,
  Card,
  IconButton,
  Tooltip,
  Typography
} from '@mui/joy'
import {FiPlus} from 'react-icons/fi'

import {useMission} from './data/MissionContext.jsx'
import DropdownInput from './components/inputs/DropdownInput.jsx'
import TextInput from './components/inputs/TextInput.jsx'
import Toggle from './components/inputs/Toggle.jsx'
import AutocompleteInput from './components/inputs/AutocompleteInput.jsx'
import StageEditor from './components/stage/StageEditor.jsx'
import BranchEditor from './components/branch/BranchEditor.jsx'

import missionTypes from './data/mission/mission-type.json'
import missionStates from './data/mission/mission-state.json'
import missionOwners from './data/mission/mission-owner.json'
import missionGranters from './data/mission/mission-granter-keys.json'
import triumphLoopVideos from './data/mission/triumph-loop-video-keys.json'
import {stageDefaults} from './data/defaults.js'

function getMaxStageID(missionStages) {
  return missionStages.reduce((max, stage) => {
    return stage.StageID > max ? stage.StageID : max
  }, 0)
}

export default function MissionEditor() {
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
        <Card
          variant="outlined"
          sx={{
            gridArea: 'content',
            padding: '1rem',
            flex: '0 0 50%',
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

          <AccordionGroup
            variant="outlined"
            sx={{
              flexGrow: 0,
              borderRadius: 'lg',
              [`& .${accordionSummaryClasses.button}:hover`]: {
                bgcolor: 'transparent !important',
              },
              [`& .${accordionDetailsClasses.content}`]: {
                boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider} !important`,
                [`&.${accordionDetailsClasses.expanded}`]: {
                  paddingBlock: '0.75rem',
                },
              },
            }}
          >
            {missionData.missionStages.length ? missionData.missionStages.map((stage, index) => (
              <StageEditor
                key={index}
                stage={stage}
                updateStageData={(name, value) => {
                  const newStages = [...missionData.missionStages]
                  newStages[index][name] = value
                  const maxStageID =
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
              m: '0.5rem'
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