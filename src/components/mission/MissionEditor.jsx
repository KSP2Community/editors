import {
  Box,
  Card,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/joy'
import {v4 as uuidv4} from 'uuid'
import {FiFile, FiFolder, FiSave} from 'react-icons/fi'
import TextInput from './inputs/TextInput.jsx'
import DropdownInput from './inputs/DropdownInput.jsx'
import Toggle from './inputs/Toggle.jsx'
import AutocompleteInput from './inputs/AutocompleteInput.jsx'
import ContentBranchEditor from './branch/ContentBranchEditor.jsx'
import StageEditor from './stage/StageEditor.jsx'
import ArrayInput from './inputs/ArrayInput.jsx'

import missionTypes from '/src/data/mission/mission-types.json'
import missionStates from '/src/data/mission/mission-states.json'
import missionOwners from '/src/data/mission/mission-owners.json'
import missionGranters from '/src/data/mission/mission-granter-keys.json'
import missionUiDisplayType from '/src/data/mission/mission-ui-display-types.json'
import triumphLoopVideos from '/src/data/mission/triumph-loop-video-keys.json'
import stageDefaults from '/src/data/mission/stage/stage-defaults.json'
import contentBranchDefaults from '/src/data/mission/branch/content-branch-defaults.json'

function getMaxStageID(missionStages) {
  return missionStages.reduce((max, stage) => {
    const stageID = parseInt(stage.StageID)
    return stageID > max ? stageID : max
  }, -1)
}

export default function MissionEditor({missionData, updateMissionData, ...props}) {
  return <>
    <Card
      {...props}
      variant="outlined"
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Typography level="h4" component="h2">
          {missionData.ID && `Mission ${missionData.ID}` || "New mission"}
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: '0.5rem',
        }}>
          <Tooltip title="New mission" placement="top">
            <IconButton aria-label="New mission" variant="outlined">
              <FiFile/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Open mission file" placement="top">
            <IconButton aria-label="Open mission file" variant="outlined">
              <FiFolder/>
            </IconButton>
          </Tooltip>

          <Dropdown>
            <Tooltip title="Save mission file" placement="top">
              <MenuButton
                slots={{root: IconButton}}
                slotProps={{root: {variant: 'outlined', 'aria-label': 'Save mission file'}}}
              >
                <FiSave/>
              </MenuButton>
            </Tooltip>
            <Menu>
              <MenuItem>Save as .patch file</MenuItem>
              <MenuItem>Save as .json file</MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </Box>

      <Card sx={{
        p: 0,
        border: 'none',
        maxHeight: '100%',
        overflowY: 'auto',
        marginX: '-0.5rem',
        paddingX: '0.5rem',
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
                    itemTitle={({item}) => item.name || `ID: ${item.StageID}`}
                    addButtonClick={() => {
                      const newStageID = getMaxStageID(missionData.missionStages) + 1
                      updateMissionData("missionStages", [...missionData.missionStages, {
                        StageID: newStageID,
                        __uuid: uuidv4(),
                        ...stageDefaults
                      }])
                      updateMissionData("maxStageID", newStageID)
                    }}
                    updateData={index => (name, value) => {
                      const newStages = [...missionData.missionStages]
                      newStages[index][name] = value
                      updateMissionData("missionStages", newStages)
                      updateMissionData("maxStageID", getMaxStageID(newStages))
                    }}
                    deleteData={index => {
                      const newStages = [...missionData.missionStages]
                      newStages.splice(index, 1)
                      updateMissionData("missionStages", newStages)
                      updateMissionData("maxStageID", getMaxStageID(newStages))
                    }}
                    renderComponent={({item, updateData}) => <StageEditor stage={item}
                                                                          updateStageData={updateData}/>}
        />

        <ArrayInput level={0}
                    array={missionData.ContentBranches}
                    title="Content branches"
                    addButtonText="Add branch"
                    noItemsText="No content branches"
                    itemTitle={({item}) => item.ID}
                    addButtonClick={() => updateMissionData("ContentBranches", [...missionData.ContentBranches, {
                      __uuid: uuidv4(),
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
  </>
}