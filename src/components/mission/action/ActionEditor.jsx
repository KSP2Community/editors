import {useState} from 'react'
import * as Editors from './EditorComponents.jsx'
import ComplexAutocompleteInput from '../inputs/ComplexAutocompleteInput.jsx'
import {v4 as uuidv4} from 'uuid'

function getAQN(className) {
  return `KSP.Game.Missions.${className}, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null`
}

const actionTypes = [
  {
    value: getAQN("ActivateMissionAction"),
    label: "Activate Mission",
    description: "Activate a mission by passing in a MissionOwner and MissionID, this will assume the Owner ID based on current player entry and current player's agency.",
    component: "ActivateMissionActionEditor",
    defaults: {
      $type: getAQN("ActivateMissionAction"),
      TargetMissionID: "",
      MissionOwner: "Player",
      StageEvent: null
    }
  }
]

export default function ActionEditor({action, updateData}) {
  const [actionType, setActionType] = useState(action ? action.$type : null)

  const componentName = actionTypes.find(type => type.value === actionType)?.component
  const EditorComponent = componentName ? Editors[componentName] : null

  return <>
    <ComplexAutocompleteInput name="ActionType" label="Action Type" value={actionType}
                              options={actionTypes} placeholder="Select action type"
                              onChange={(_, newValue) => {
                                setActionType(newValue)
                                updateData(
                                  newValue === null
                                    ? null
                                    : {
                                      __uuid: action?.__uuid || uuidv4(),
                                      ...actionTypes.find(type => type.value === newValue)?.defaults
                                    }
                                )
                              }}
    />
    {EditorComponent && <EditorComponent action={action} updateData={
      (name, value) => {
        updateData({...action, ...{[name]: value}})
      }
    }/>}
  </>
}