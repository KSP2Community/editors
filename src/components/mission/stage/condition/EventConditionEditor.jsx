import ComplexAutocompleteInput from '../../inputs/ComplexAutocompleteInput.jsx'

import eventTypes from '/src/data/mission/stage/condition/event-type.json'

export default function EventConditionEditor({condition, updateData}) {
  return (
    <ComplexAutocompleteInput name="EventTypeAQN" label="Event Type" value={condition.EventTypeAQN}
                              onChange={updateData} options={eventTypes} placeholder="Select event type"/>
  )
}