import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import ComplexAutocompleteInput from '../../inputs/ComplexAutocompleteInput.jsx'
import ConditionSetEditor from './ConditionSetEditor.jsx'
import EventConditionEditor from './EventConditionEditor.jsx'
import PropertyConditionEditor from './PropertyConditionEditor.jsx'

import conditionSetDefaults from '/src/data/mission/stage/condition/condition-set-defaults.json'
import eventConditionDefaults from '/src/data/mission/stage/condition/event-condition-defaults.json'
import propertyConditionDefaults from '/src/data/mission/stage/condition/property-condition-defaults.json'
import eventTypes from '/src/data/mission/stage/condition/event-types.json'
import propertyTypes from '/src/data/mission/stage/condition/property-types.json'
import {getClassNameFromAQN} from '../../../../utils/csharp.js'

export const conditionTypes = [
  {
    value: "ConditionSet",
    label: "Condition Set",
    description: "A set of conditions",
    component: ConditionSetEditor,
    defaults: conditionSetDefaults
  },
  {
    value: "EventCondition",
    label: "Event Condition",
    description: "A condition that checks for a game message",
    component: EventConditionEditor,
    defaults: eventConditionDefaults
  },
  {
    value: "PropertyCondition",
    label: "Property Condition",
    description: "A condition that checks for a property value",
    component: PropertyConditionEditor,
    defaults: propertyConditionDefaults
  }
]

export function getConditionLabel({item, index}) {
  if (!item || !item.ConditionType) {
    return `Condition #${index + 1}`
  }

  const typeLabel = conditionTypes.find(type => type.value === item.ConditionType).label

  switch (item.ConditionType) {
    case "ConditionSet":
      return item.ConditionMode +
        ` (${item.Children.length} ${item.Children.length === 1 ? "child" : "children"})`
    case "EventCondition":
      if (!item.EventTypeAQN) {
        return typeLabel
      }
      let eventTypeLabel = eventTypes.find(type => type.value === item.EventTypeAQN)?.label
      if (!eventTypeLabel) {
        eventTypeLabel = getClassNameFromAQN(item.EventTypeAQN)
      }
      return `${typeLabel}: ${eventTypeLabel}`
    case "PropertyCondition":
      if (!item.PropertyTypeAQN) {
        return typeLabel
      }
      let propertyTypeLabel = propertyTypes.find(type => type.value === item.PropertyTypeAQN)?.label
      if (!propertyTypeLabel) {
        propertyTypeLabel = getClassNameFromAQN(item.PropertyTypeAQN)
      }
      return `${typeLabel}: ${propertyTypeLabel}`
  }
}

export default function ConditionEditor({condition, updateData}) {
  const [conditionType, setConditionType] = useState(condition ? condition.ConditionType : null)

  const EditorComponent = conditionTypes.find(type => type.value === conditionType)?.component

  return <>
    <ComplexAutocompleteInput name="ConditionType" label="Condition Type" value={conditionType}
                              options={conditionTypes} placeholder="Select condition type"
                              onChange={(_, newValue) => {
                                setConditionType(newValue)
                                updateData({
                                  __uuid: condition?.__uuid || uuidv4(),
                                  ...conditionTypes.find(type => type.value === newValue)?.defaults
                                })
                              }}
    />
    {EditorComponent && <EditorComponent condition={condition} updateData={
      (name, value) => {
        updateData({...condition, ...{[name]: value}})
      }
    }/>}
  </>
}