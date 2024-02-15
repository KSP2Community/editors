import {
  accordionDetailsClasses,
  AccordionGroup,
  accordionSummaryClasses,
  Box,
  Card,
  IconButton,
  Tooltip,
  Typography
} from '@mui/joy'
import TextInput from './inputs/TextInput.jsx'
import DropdownInput from './inputs/DropdownInput.jsx'
import Toggle from './inputs/Toggle.jsx'
import AutocompleteInput from './inputs/AutocompleteInput.jsx'
import {FiPlus} from 'react-icons/fi'
import BranchEditor from './branch/BranchEditor.jsx'
import StageEditor from './stage/StageEditor.jsx'

import missionTypes from '/src/data/mission/mission-type.json'
import missionStates from '/src/data/mission/mission-state.json'
import missionOwners from '/src/data/mission/mission-owner.json'
import missionGranters from '/src/data/mission/mission-granter-keys.json'
import missionUiDisplayType from '/src/data/mission/mission-ui-display-type.json'
import triumphLoopVideos from '/src/data/mission/triumph-loop-video-keys.json'
import stageDefaults from '/src/data/mission/stage/stage-defaults.json'

export default function MissionEditor({missionData, updateMissionData}) {
  return <Card
    variant="outlined"
    sx={{
      gridArea: 'content',
      padding: '1rem',
      flex: '0 0 50%',
    }}>
    <Typography level="h4" component="h2">Mission parameters</Typography>

    <TextInput name="ID" label="Mission ID" value={missionData.ID} onChange={updateMissionData}/>
    <TextInput name="name" label="Name Localization Key" value={missionData.name} onChange={updateMissionData}/>
    <TextInput name="description" label="Description Localization Key" value={missionData.description}
               onChange={updateMissionData}/>
    <DropdownInput name="type" label="Type" options={missionTypes} value={missionData.type}
                   onChange={updateMissionData}/>
    <DropdownInput name="Owner" label="Owner" options={missionOwners} value={missionData.Owner}
                   onChange={updateMissionData}/>
    <DropdownInput name="state" label="State" options={missionStates} value={missionData.state}
                   onChange={updateMissionData}/>
    <Toggle name="Hidden" label="Hidden" value={missionData.Hidden} onChange={updateMissionData}/>
    <AutocompleteInput name="MissionGranterKey" label="Mission Granter" options={missionGranters}
                       value={missionData.MissionGranterKey} onChange={updateMissionData}/>
    <AutocompleteInput name="TriumphLoopVideoKey" label="Triumph Loop Video" options={triumphLoopVideos}
                       value={missionData.TriumphLoopVideoKey} onChange={updateMissionData}/>
    <Toggle name="VisibleRewards" label="Rewards Visible" value={missionData.VisibleRewards}
            onChange={updateMissionData}/>
    <DropdownInput name="uiDisplayType" label="UI Display Type" options={missionUiDisplayType}
                   value={missionData.uiDisplayType} onChange={updateMissionData}/>

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
            updateMissionData("maxStageID", index)
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
}