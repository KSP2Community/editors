import {
  Box, Button,
  Card, Dropdown, IconButton, Menu, MenuButton, MenuItem, Tooltip,
  Typography
} from '@mui/joy'
import TextInput from './inputs/TextInput.jsx'
import DropdownInput from './inputs/DropdownInput.jsx'
import Toggle from './inputs/Toggle.jsx'
import AutocompleteInput from './inputs/AutocompleteInput.jsx'
import ContentBranchEditor from './branch/ContentBranchEditor.jsx'
import StageEditor from './stage/StageEditor.jsx'

import missionTypes from '/src/data/mission/mission-type.json'
import missionStates from '/src/data/mission/mission-state.json'
import missionOwners from '/src/data/mission/mission-owner.json'
import missionGranters from '/src/data/mission/mission-granter-keys.json'
import missionUiDisplayType from '/src/data/mission/mission-ui-display-type.json'
import triumphLoopVideos from '/src/data/mission/triumph-loop-video-keys.json'
import stageDefaults from '/src/data/mission/stage/stage-defaults.json'
import contentBranchDefaults from '/src/data/mission/branch/content-branch-defaults.json'
import ArrayInput from './inputs/ArrayInput.jsx'
import {FiFile, FiFolder, FiSave} from 'react-icons/fi'
import {useState} from 'react'

function getMaxStageID(missionStages) {
  return missionStages.reduce((max, stage) => {
    return stage.StageID > max ? stage.StageID : max
  }, -1)
}

export default function MissionEditor({missionData, updateMissionData, ...props}) {
  return (
    <Card
      {...props}
      variant="outlined"
      sx={[
        {
          padding: '1rem',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Typography level="h4" component="h2">Mission editor</Typography>
      </Box>

      <Card sx={{
        p: 0,
        border: 'none',
        maxHeight: '100%',
        overflowY: 'auto',
      }}>
        <TextInput name="ID" label="Mission ID" value={missionData.ID} onChange={updateMissionData}/>
        <TextInput name="name" label="Name Localization Key" value={missionData.name}
                   onChange={updateMissionData}/>
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

        <ArrayInput level={0}
                    array={missionData.missionStages}
                    title="Stages"
                    addButtonText="Add stage"
                    noItemsText="No stages"
                    itemTitle={({item}) => `Stage ${item.StageID}`}
                    addButtonClick={() => updateMissionData("missionStages", [...missionData.missionStages, {
                      StageID: getMaxStageID(missionData.missionStages) + 1,
                      ...stageDefaults
                    }])}
                    updateData={index => (name, value) => {
                      const newStages = [...missionData.missionStages]
                      newStages[index][name] = value
                      updateMissionData("maxStageID", index)
                      updateMissionData("missionStages", newStages)
                    }}
                    deleteData={index => {
                      const newStages = [...missionData.missionStages]
                      newStages.splice(index, 1)
                      updateMissionData("missionStages", newStages)
                    }}
                    renderComponent={({item, updateData}) => <StageEditor stage={item}
                                                                          updateStageData={updateData}/>}
        />

        <ArrayInput level={0}
                    array={missionData.ContentBranches}
                    title="Content branches"
                    addButtonText="Add branch"
                    noItemsText="No content branches"
                    itemTitle={({item}) => `Branch ${item.ID}`}
                    addButtonClick={() => updateMissionData("ContentBranches", [...missionData.ContentBranches, {
                      ...contentBranchDefaults
                    }])}
                    updateData={(index) => (name, value) => {
                      const newBranches = [...missionData.ContentBranches]
                      newBranches[index][name] = value
                      updateMissionData("ContentBranches", newBranches)
                    }}
                    deleteData={index => {
                      const newBranches = [...missionData.ContentBranches]
                      newBranches.splice(index, 1)
                      updateMissionData("ContentBranches", newBranches)
                    }}
                    renderComponent={({item, updateData}) => <ContentBranchEditor branch={item}
                                                                                  updateBranchData={updateData}/>}
        />
      </Card>
    </Card>
  )
}