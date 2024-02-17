import {useState} from 'react'

import DropdownInput from '../../inputs/DropdownInput.jsx'
import ConditionSetEditor from './ConditionSetEditor.jsx'
import EventConditionEditor from './EventConditionEditor.jsx'
import PropertyConditionEditor from './PropertyConditionEditor.jsx'

import conditionSetDefaults from '/src/data/mission/stage/condition/condition-set-defaults.json'
import eventConditionDefaults from '/src/data/mission/stage/condition/event-condition-defaults.json'
import propertyConditionDefaults from '/src/data/mission/stage/condition/property-condition-defaults.json'

export const NONE = "None"
export const CONDITION_SET = "ConditionSet"
export const EVENT_CONDITION = "EventCondition"
export const PROPERTY_CONDITION = "PropertyCondition"

const conditionTypes = {
  [NONE]: "None",
  [CONDITION_SET]: "Condition Set",
  [EVENT_CONDITION]: "Event Condition",
  [PROPERTY_CONDITION]: "Property Condition"
}

const conditionTypeToComponent = {
  [CONDITION_SET]: ConditionSetEditor,
  [EVENT_CONDITION]: EventConditionEditor,
  [PROPERTY_CONDITION]: PropertyConditionEditor
}

export const conditionTypeToDefault = {
  [CONDITION_SET]: conditionSetDefaults,
  [EVENT_CONDITION]: eventConditionDefaults,
  [PROPERTY_CONDITION]: propertyConditionDefaults
}

export default function ConditionEditor({condition, updateData}) {
  const [conditionType, setConditionType] = useState(condition ? condition.ConditionType : NONE)

  const EditorComponent = conditionTypeToComponent[conditionType] ?? null

  return <>
    <DropdownInput name="TypeSelector" label="Condition Type" options={conditionTypes} value={conditionType}
                   onChange={(_, newValue) => {
                     setConditionType(newValue)

                     if (newValue === NONE) {
                       updateData(null)
                       return
                     }

                     updateData({...conditionTypeToDefault[newValue]})
                   }}/>
    {EditorComponent && <EditorComponent condition={condition} updateData={
      (name, value) => {
        updateData({...condition, ...{[name]: value}})
      }
    }/>}
  </>
}