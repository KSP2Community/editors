import * as React from 'react'
import {v4 as uuidv4} from 'uuid'
import {tryParseFloat} from '../../../utils/strings.js'

import TextInput from '../inputs/TextInput.jsx'
import DropdownInput from '../inputs/DropdownInput.jsx'
import ComplexAutocompleteInput from '../inputs/ComplexAutocompleteInput.jsx'
import AutocompleteInput from '../inputs/AutocompleteInput.jsx'
import Toggle from '../inputs/Toggle.jsx'
import ArrayInput from '../inputs/ArrayInput.jsx'
import Vector2Input from '../inputs/Vector3Input.jsx'
import Vector3Input from '../inputs/Vector3Input.jsx'

import missionOwners from '/src/data/mission/mission-owners.json'
import finishedEventTypes from '/src/data/mission/action/finished-event-types.json'
import messageBoxButtonTypes from '/src/data/mission/action/message-box-button-types.json'
import imageKeys from '/src/data/mission/action/image-keys.json'
import stageEvents from '/src/data/mission/action/stage-events.json'
import selectedWorkspaceDefaults from '/src/data/mission/action/selected-workspace-defaults.json'
import partCategories from '/src/data/mission/action/part-categories.json'
import characterNameLocKeys from '/src/data/mission/action/character-name-loc-keys.json'
import characterIconKeys from '/src/data/mission/action/character-icon-keys.json'
import dialogEntryDefaults from '/src/data/mission/action/dialog-entry-defaults.json'
import contentAddressableKeys from '/src/data/mission/action/content-addressable-keys.json'
import disableInputTypes from '/src/data/mission/action/disable-input-types.json'
import highlightTypes from '/src/data/mission/action/highlight-types.json'
import highlightPrefabKeys from '/src/data/mission/action/highlight-prefab-keys.json'
import maneuverGizmoInputTypes from '/src/data/mission/action/maneuver-gizmo-input-types.json'
import orbitNodeTrajectoryEvents from '/src/data/mission/action/orbit-node-trajectory-events.json'
import indicatorPrefabKeys from '/src/data/mission/action/indicator-prefab-keys.json'
import missionStates from '/src/data/mission/action/mission-states.json'
import viewDefinitionDefaults from '/src/data/mission/action/view-definition-defaults.json'
import viewStates from '/src/data/mission/action/view-states.json'

export function ActivateMissionActionEditor({action, updateData}) {
  return <>
    <TextInput name="TargetMissionID" label="Target Mission ID" value={action.TargetMissionID} onChange={updateData}/>
    <DropdownInput name="MissionOwner" label="Mission Owner" options={missionOwners} value={action.MissionOwner}
                   onChange={updateData}/>
  </>
}

export function FullscreenVideoActionEditor({action, updateData}) {
  return <>
    <ComplexAutocompleteInput name="eventTypeOnFinished" label="Event Type On Finished" freeSolo
                              value={action.eventTypeOnFinished} onChange={updateData}
                              options={finishedEventTypes}/>
    <TextInput name="scriptableObjectKey" label="Scriptable Object Key" value={action.scriptableObjectKey}
               onChange={updateData}/>
  </>
}

export function MessageBoxActionEditor({action, updateData}) {
  return <>
    <TextInput name="windowTitle" label="Window Title" value={action.windowTitle} onChange={updateData}/>
    <TextInput name="title" label="Title" value={action.title} onChange={updateData}/>
    <TextInput name="message" label="Message" value={action.message} onChange={updateData}/>
    <ComplexAutocompleteInput name="eventType" label="Event Type" value={action.eventType} freeSolo
                              onChange={updateData}
                              options={finishedEventTypes}/>
    <DropdownInput name="buttonType" label="Button Type" options={messageBoxButtonTypes} value={action.buttonType}
                   onChange={updateData}/>
    <AutocompleteInput name="imageKey" label="Image Key" value={action.imageKey} freeSolo onChange={updateData}
                       options={imageKeys}/>
    <StageEvent action={action} updateData={updateData}/>
  </>
}

export function MissionAudioActionEditor({action, updateData}) {
  return <>
    <StageEvent action={action} updateData={updateData}/>
  </>
}

export function MissionActionOABSettingsEditor({action, updateData}) {
  return <>
    <Toggle name="RevertBackupVesselToOAB" label="Revert Backup Vessel To OAB" value={action.RevertBackupVesselToOAB}
            onChange={updateData}/>
    <Toggle name="ClearSelectedWorkspacesToLoadOnStart" label="Clear Selected Workspaces To Load On Start"
            value={action.ClearSelectedWorkspacesToLoadOnStart} onChange={updateData}/>
    <ArrayInput level={1}
                array={action.SelectedWorkspaces}
                title="Selected Workspaces"
                addButtonText="Add workspace"
                noItemsText="No workspaces"
                itemTitle={({item, index}) =>
                  !item?.WorkspaceAddressableKey ? `Workspace #${index}` : item.WorkspaceAddressableKey
                }
                addButtonClick={() => {
                  updateData("SelectedWorkspaces", [
                    ...action.SelectedWorkspaces,
                    {
                      __uuid: uuidv4(),
                      ...selectedWorkspaceDefaults
                    }
                  ])
                }}
                updateData={index => (name, value) => {
                  const newWorkspaces = [...action.SelectedWorkspaces]
                  newWorkspaces[index][name] = value
                  updateData("SelectedWorkspaces", newWorkspaces)
                }}
                deleteData={index => {
                  const newWorkspaces = [...action.SelectedWorkspaces]
                  newWorkspaces.splice(index, 1)
                  updateData("SelectedWorkspaces", newWorkspaces)
                }}
                renderComponent={({item, updateData}) => <>
                  <TextInput name="WorkspaceAddressableKey" label="Workspace Addressable Key"
                             value={item.WorkspaceAddressableKey} onChange={updateData}/>
                  <TextInput name="ThumbnailKey" label="Thumbnail Key" value={item.ThumbnailKey} onChange={updateData}/>
                </>}
    />
    <ArrayInput level={1}
                array={action.FavoriteParts}
                title="Favorite parts"
                addButtonText="Add part"
                noItemsText="No parts"
                itemTitle={({item, index}) =>
                  !item ? `Part #${index}` : item
                }
                addButtonClick={() => {
                  updateData("FavoriteParts", [
                    ...action.FavoriteParts,
                    ""
                  ])
                }}
                updateData={index => (_, value) => {
                  const newParts = [...action.FavoriteParts]
                  newParts[index] = value
                  updateData("FavoriteParts", newParts)
                }}
                deleteData={index => {
                  const newParts = [...action.FavoriteParts]
                  newParts.splice(index, 1)
                  updateData("FavoriteParts", newParts)
                }}
                renderComponent={({item, updateData}) => <>
                  <TextInput name="partName" label="Part Name" value={item} onChange={updateData}/>
                </>}
    />
    <AutocompleteInput name="PartCategory" label="Part Category" options={partCategories} value={action.PartCategory}
                       freeSolo onChange={updateData}/>
    <TextInput name="VesselBackupFileKey" label="Vessel Backup File Key" value={action.VesselBackupFileKey}
               onChange={(name, value) => {
                 updateData(name, value || null)
               }}/>
  </>
}

export function MissionCharacterDialogActionEditor({action, updateData}) {
  return <>
    <AutocompleteInput name="CharacterNameLocKey" label="Character Name Localization Key" options={characterNameLocKeys}
                       value={action.CharacterNameLocKey} freeSolo onChange={updateData}/>
    <AutocompleteInput name="CharacterIconKey" label="Character Icon Key" options={characterIconKeys}
                       value={action.CharacterIconKey} freeSolo onChange={updateData}/>
    <ArrayInput level={1}
                array={action.Dialogs.Entries}
                title="Dialog entries"
                addButtonText="Add dialog entry"
                noItemsText="No dialog entries"
                itemTitle={({item, index}) => item.LocKey || `Dialog entry #${index}`}
                addButtonClick={() => {
                  const newEntries = [
                    ...action.Dialogs.Entries,
                    {...dialogEntryDefaults, __uuid: uuidv4()}
                  ]
                  updateData("Dialogs", {
                    ...action.Dialogs,
                    Entries: newEntries
                  })
                }}
                updateData={index => (name, value) => {
                  const newEntries = [...action.Dialogs.Entries]
                  newEntries[index][name] = value
                  const newViewState = {...action.Dialogs, Entries: newEntries}
                  updateData("Dialogs", newViewState)
                }}
                deleteData={index => {
                  const newEntries = [...action.Dialogs.Entries]
                  newEntries.splice(index, 1)
                  const newViewState = {...action.Dialogs, Entries: newEntries}
                  updateData("Dialogs", newViewState)
                }}
                renderComponent={({item, updateData}) => <>
                  <Toggle name="ShowsInHistory" label="Shows In History" value={item.ShowsInHistory}
                          onChange={updateData}/>
                  <TextInput name="LocKey" label="Localization Key" value={item.LocKey} onChange={updateData}/>
                  <AutocompleteInput name="ContentAddressableKey" label="Content Addressable Key"
                                     options={contentAddressableKeys} value={item.ContentAddressableKey} freeSolo
                                     onChange={updateData}/>
                </>}
    />
    <ComplexAutocompleteInput name="EventTypeOnClosed" label="Event Type On Closed" value={action.EventTypeOnClosed}
                              freeSolo onChange={updateData} options={finishedEventTypes}/>
    <StageEvent action={action} updateData={updateData}/>
  </>
}

export function MissionCreateSnapshotActionEditor() {
  return <></>
}

export function MissionDestinationPositionEditor({action, updateData}) {
  return <>
    <TextInput name="celestialBodyName" label="Celestial Body Name" value={action.celestialBodyName}
               onChange={updateData}/>
    <Vector3Input label="Celestial Body Coordinates" vector={action.cb_Coords}
                  updateData={(name, value) => updateData("cb_Coords", {
                    ...action.cb_Coords,
                    ...{[name]: value}
                  })}/>
  </>
}

export function MissionDisableInputActionEditor({action, updateData}) {
  return <>
    <DropdownInput name="InputType" label="Input Type" options={disableInputTypes} value={action.InputType}
                   onChange={updateData}/>
  </>
}

export function MissionHighlightActionEditor({action, updateData}) {
  return <>
    <DropdownInput name="highlightType" label="Highlight Type" options={highlightTypes} value={action.highlightType}
                   onChange={updateData}/>
    <Toggle name="trackInNavball" label="Track In Navball" value={action.trackInNavball} onChange={updateData}/>
    <TextInput name="attachNodeID" label="Attach Node ID" value={action.attachNodeID} onChange={updateData}/>
    <TextInput name="attachNodehighlight" label="Attach Node Highlight" value={action.attachNodehighlight}
               onChange={updateData}/>
    <TextInput name="trackingGUID" label="Tracking GUID" value={action.trackingGUID} onChange={updateData}/>
    <TextInput name="partName" label="Part Name" value={action.partName} onChange={updateData}/>
    <Toggle name="lastPartPlaced" label="Last Part Placed" value={action.lastPartPlaced} onChange={updateData}/>
    <TextInput name="celestialBodyName" label="Celestial Body Name" value={action.celestialBodyName}
               onChange={updateData}/>
    <AutocompleteInput name="prefabKey" label="Prefab Key" options={highlightPrefabKeys} value={action.prefabKey}
                       freeSolo onChange={updateData}/>
    <Vector3Input label="Offset" vector={action.offset}
                  updateData={(name, value) => updateData("offset", {
                    ...action.offset,
                    ...{[name]: value}
                  })}/>
    <Vector3Input label="Orientation" vector={action.orientation}
                  updateData={(name, value) => updateData("orientation", {
                    ...action.orientation,
                    ...{[name]: value}
                  })}/>
    <Toggle name="cb_Coordinates" label="Use Celestial Body Coordinates" value={action.cb_Coordinates}
            onChange={updateData}/>
    <Vector3Input label="Celestial Body Coordinates" vector={action.cb_Coords}
                  updateData={(name, value) => updateData("cb_Coords", {
                    ...action.cb_Coords,
                    ...{[name]: value}
                  })}/>
    <DropdownInput name="maneuverGizmoHandle" label="Maneuver Gizmo Handle" options={maneuverGizmoInputTypes}
                   value={action.maneuverGizmoHandle} onChange={updateData}/>
    <DropdownInput name="orbitNodeTrajectoryEvent" label="Orbit Node Trajectory Event"
                   options={orbitNodeTrajectoryEvents} value={action.orbitNodeTrajectoryEvent} onChange={updateData}/>
    <TextInput name="timeFromOrbitTrajectory" label="Time From Orbit Trajectory" type="number"
               value={action.timeFromOrbitTrajectory}
               onChange={(name, value) =>
                 updateData(name, tryParseFloat(value))
               }/>
  </>
}

export function MissionIndicatorActionEditor({action, updateData}) {
  return <>
    <TextInput name="title" label="Title" value={action.title} onChange={updateData}/>
    <TextInput name="body" label="Body" value={action.body} onChange={updateData}/>
    <AutocompleteInput name="prefabKey" label="Prefab Key" options={indicatorPrefabKeys} value={action.prefabKey}
                       freeSolo onChange={updateData}/>
    <TextInput name="tagName" label="Tag Name" value={action.tagName} onChange={updateData}/>
    <Vector2Input label="Normalized Position" vector={action.normalizedPos}
                  updateData={(name, value) => updateData("normalizedPos", {
                    ...action.normalizedPos,
                    ...{[name]: value}
                  })}/>
    <Vector2Input label="Offset" vector={action.offset}
                  updateData={(name, value) => updateData("offset", {
                    ...action.offset,
                    ...{[name]: value}
                  })}/>
    <TextInput name="mainSpriteKey" label="Main Sprite Key" value={action.mainSpriteKey} onChange={updateData}/>
    <TextInput name="mainTextureKey" label="Main Texture Key" value={action.mainTextureKey} onChange={updateData}/>
    <Vector2Input label="Image Size" vector={action.imageSize} isInteger
                  updateData={(name, value) => updateData("imageSize", {
                    ...action.imageSize,
                    ...{[name]: value}
                  })}/>
    <Toggle name="stayAnchored" label="Stay Anchored" value={action.stayAnchored} onChange={updateData}/>
    <Toggle name="animateOffScreen" label="Animate Off Screen" value={action.animateOffScreen} onChange={updateData}/>
    <Toggle name="showTitleOnly" label="Show Title Only" value={action.showTitleOnly} onChange={updateData}/>
    <TextInput name="closeTime" label="Close Time" type="number" value={action.closeTime}
               onChange={(name, value) =>
                 updateData(name, tryParseFloat(value))
               }/>
    <TextInput name="trackingObjectID" label="Tracking Object ID" value={action.trackingObjectID} onChange={updateData}/>
    <TextInput name="trackingGUID" label="Tracking GUID" value={action.trackingGUID} onChange={updateData}/>
    <TextInput name="loopVideoKey" label="Loop Video Key" value={action.loopVideoKey} onChange={updateData}/>
    <TextInput name="partName" label="Part Name" value={action.partName} onChange={updateData}/>
    <Toggle name="lastPartPlaced" label="Last Part Placed" value={action.lastPartPlaced} onChange={updateData}/>
  </>
}

export function MissionPauseActionEditor() {
  return <></>
}

export function MissionReloadSnapshotActionEditor() {
  return <></>
}

export function MissionResolutionActionEditor({action, updateData}) {
  return <>
    <DropdownInput name="MissionResolution" label="Mission Resolution" options={missionStates}
                   value={action.MissionResolution} onChange={updateData}/>
    <Toggle name="waitForSummaryDismissed" label="Wait For Summary Dismissed" value={action.waitForSummaryDismissed}
            onChange={updateData}/>
    <StageEvent action={action} updateData={updateData}/>
  </>
}

export function MissionSetViewStateActionEditor({action, updateData}) {
  return <>
    <ArrayInput level={1}
                array={action.viewState.ViewDefinitions}
                title="View State"
                addButtonText="Add view state"
                noItemsText="No view states"
                itemTitle={({item, index}) => item.ID || `View State #${index}`}
                addButtonClick={() => {
                  const newViewDefinitions = [
                    ...action.viewState.ViewDefinitions,
                    {...viewDefinitionDefaults, __uuid: uuidv4()}
                  ]
                  updateData("viewState", {
                    ...action.viewState,
                    ViewDefinitions: newViewDefinitions
                  })
                }}
                updateData={index => (name, value) => {
                  const newViewDefinitions = [...action.viewState.ViewDefinitions]
                  newViewDefinitions[index][name] = value
                  const newViewState = {...action.viewState, ViewDefinitions: newViewDefinitions}
                  updateData("viewState", newViewState)
                }}
                deleteData={index => {
                  const newViewDefinitions = [...action.viewState.ViewDefinitions]
                  newViewDefinitions.splice(index, 1)
                  const newViewState = {...action.viewState, ViewDefinitions: newViewDefinitions}
                  updateData("viewState", newViewState)
                }}
                renderComponent={({item, updateData}) => <>
                  <TextInput name="ID" label="ID" value={item.ID} onChange={updateData}/>
                  <DropdownInput name="State" label="State" options={viewStates} value={item.State}
                                 onChange={updateData}/>
                </>}
    />
    <Toggle name="restorePreviousView" label="Restore Previous View" value={action.restorePreviousView}
            onChange={updateData}/>
  </>
}

export function MissionScriptActionEditor({action, updateData}) {
  return <>
    <TextInput name="luascript" label="Lua Script" value={action.luascript} onChange={updateData} multiline/>
  </>
}

function StageEvent({action, updateData}) {
  return <AutocompleteInput name="StageEvent" label="Stage Event" value={action.StageEvent} freeSolo
                            onChange={updateData} options={stageEvents}/>
}