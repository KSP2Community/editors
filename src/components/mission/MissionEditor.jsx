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
import {useDropzone} from 'react-dropzone'

import TextInput from './inputs/TextInput.jsx'
import DropdownInput from './inputs/DropdownInput.jsx'
import Toggle from './inputs/Toggle.jsx'
import AutocompleteInput from './inputs/AutocompleteInput.jsx'
import ContentBranchEditor from './branch/ContentBranchEditor.jsx'
import StageEditor from './stage/StageEditor.jsx'
import ArrayInput from './inputs/ArrayInput.jsx'
import {parseMission, stringifyMission} from '../../utils/missions.js'
import {useMission} from '../../contexts/MissionContext.jsx'

import missionDefaults from '/src/data/mission/mission-defaults.json'
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

export default function MissionEditor({...props}) {
  const {missionData, updateMissionData, setMissionData} = useMission()
  const {open: openFileDialog} = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      'application/json': ['.json', '.patch'],
    },
    maxFiles: 1,
    onDropAccepted: files => {
      const isPatch = files[0].name.endsWith('.patch')
      const reader = new FileReader()
      reader.onload = () => {
        const data = parseMission(reader.result, isPatch)
        setMissionData({isDirty: false, data})
      }
      reader.readAsText(files[0])
    }
  })

  const newMissionHandler = () => {
    if (missionData.isDirty && !confirm("Are you sure you want to create a new mission? All unsaved changes will be lost.")) {
      return
    }

    setMissionData({isDirty: false, data: missionDefaults})
  }

  const openMissionHandler = () => {
    if (missionData.isDirty && !confirm("Are you sure you want to create a new mission? All unsaved changes will be lost.")) {
      return
    }

    openFileDialog()
  }

  function saveTxtToFile(fileName, textData) {
    const urlToBlob = URL.createObjectURL(new Blob([textData], {type: 'text/plain'}));
    const a = document.createElement('a');
    a.href = urlToBlob;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(urlToBlob);
  }

  const saveMissionHandler = async isPatch => {
    if (!missionData.data.ID) {
      alert("Mission ID is required!")
      return
    }

    const data = stringifyMission(missionData.data, isPatch)
    saveTxtToFile(`${missionData.data.ID}${isPatch ? '.patch' : '.json'}`, data)

    setMissionData({isDirty: false, data: missionData.data})
  }

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
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <Typography level="h4" component="h2">
            {missionData.data.ID && `Mission ${missionData.data.ID}` || "New mission"}
          </Typography>
          {missionData.isDirty && <Typography> (unsaved changes)</Typography>}
        </Box>

        <Box sx={{
          display: 'flex',
          gap: '0.5rem',
        }}>
          <Tooltip title="New mission" placement="top">
            <IconButton aria-label="New mission" variant="outlined" onClick={newMissionHandler}>
              <FiFile/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Open mission file" placement="top">
            <IconButton aria-label="Open mission file" variant="outlined" onClick={openMissionHandler}>
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
              <MenuItem onClick={() => saveMissionHandler(true)}>Save as .patch file</MenuItem>
              <MenuItem onClick={() => saveMissionHandler(false)}>Save as .json file</MenuItem>
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
        <TextInput name="ID" label="Mission ID" value={missionData.data.ID} onChange={updateMissionData}/>
        <TextInput name="name" label="Name Localization Key" value={missionData.data.name}
                   onChange={updateMissionData}/>
        <TextInput name="description" label="Description Localization Key" value={missionData.data.description}
                   onChange={updateMissionData}/>
        <DropdownInput name="type" label="Type" options={missionTypes} value={missionData.data.type}
                       onChange={updateMissionData}/>
        <DropdownInput name="Owner" label="Owner" options={missionOwners} value={missionData.data.Owner}
                       onChange={updateMissionData}/>
        <DropdownInput name="state" label="State" options={missionStates} value={missionData.data.state}
                       onChange={updateMissionData}/>
        <Toggle name="Hidden" label="Hidden" value={missionData.data.Hidden} onChange={updateMissionData}/>
        <AutocompleteInput name="MissionGranterKey" label="Mission Granter" options={missionGranters}
                           value={missionData.data.MissionGranterKey} onChange={updateMissionData}/>
        <AutocompleteInput name="TriumphLoopVideoKey" label="Triumph Loop Video" options={triumphLoopVideos}
                           value={missionData.data.TriumphLoopVideoKey} onChange={updateMissionData}/>
        <Toggle name="VisibleRewards" label="Rewards Visible" value={missionData.data.VisibleRewards}
                onChange={updateMissionData}/>
        <DropdownInput name="uiDisplayType" label="UI Display Type" options={missionUiDisplayType}
                       value={missionData.data.uiDisplayType} onChange={updateMissionData}/>

        <ArrayInput level={0}
                    array={missionData.data.missionStages}
                    title="Stages"
                    addButtonText="Add stage"
                    noItemsText="No stages"
                    itemTitle={({item}) => item.name || `ID: ${item.StageID}`}
                    addButtonClick={() => {
                      const newStageID = getMaxStageID(missionData.data.missionStages) + 1
                      updateMissionData("missionStages", [...missionData.data.missionStages, {
                        StageID: newStageID,
                        __uuid: uuidv4(),
                        ...stageDefaults
                      }])
                      updateMissionData("maxStageID", newStageID)
                    }}
                    updateData={index => (name, value) => {
                      const newStages = [...missionData.data.missionStages]
                      newStages[index][name] = value
                      updateMissionData("missionStages", newStages)
                      updateMissionData("maxStageID", getMaxStageID(newStages))
                    }}
                    deleteData={index => {
                      const newStages = [...missionData.data.missionStages]
                      newStages.splice(index, 1)
                      updateMissionData("missionStages", newStages)
                      updateMissionData("maxStageID", getMaxStageID(newStages))
                    }}
                    renderComponent={({item, updateData}) => <StageEditor stage={item}
                                                                          updateStageData={updateData}/>}
        />

        <ArrayInput level={0}
                    array={missionData.data.ContentBranches}
                    title="Content branches"
                    addButtonText="Add branch"
                    noItemsText="No content branches"
                    itemTitle={({item}) => item.ID}
                    addButtonClick={() => updateMissionData("ContentBranches", [...missionData.data.ContentBranches, {
                      __uuid: uuidv4(),
                      ...contentBranchDefaults
                    }])}
                    updateData={(index) => (name, value) => {
                      const newBranches = [...missionData.data.ContentBranches]
                      newBranches[index][name] = value
                      updateMissionData("ContentBranches", newBranches)
                    }}
                    deleteData={index => {
                      const newBranches = [...missionData.data.ContentBranches]
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