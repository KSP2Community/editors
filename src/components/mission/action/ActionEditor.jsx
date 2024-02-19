import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import * as Editors from './EditorComponents.jsx'
import ComplexAutocompleteInput from '../inputs/ComplexAutocompleteInput.jsx'
import {getClassNameFromAQN} from '../../../utils/csharp.js'

import actionTypes from '/src/data/mission/action/action-types.json'

export function getActionLabel({index, item}) {
  if (!item || !item.$type) {
    return `Action #${index + 1}`
  }

  const actionTypeLabel = actionTypes.find(type => type.value === item.$type)?.label
  return actionTypeLabel || getClassNameFromAQN(item.$type)
}

export default function ActionEditor({action, updateData}) {
  const [actionType, setActionType] = useState(action ? action.$type : null)

  const componentName = actionTypes.find(type => type.value === actionType)?.component
  const EditorComponent = componentName ? Editors[componentName] : null

  return <>
    <ComplexAutocompleteInput name="ActionType" label="Action Type" value={actionType}
                              options={actionTypes} placeholder="Select action type"
                              onChange={(_, newValue) => {
                                setActionType(newValue)
                                updateData({
                                  __uuid: action?.__uuid || uuidv4(),
                                  ...actionTypes.find(type => type.value === newValue)?.defaults
                                })
                              }}
    />
    {EditorComponent && <EditorComponent action={action} updateData={
      (name, value) => {
        updateData({...action, ...{[name]: value}})
      }
    }/>}
  </>
}