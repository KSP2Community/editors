import ComplexAutocompleteInput from '../../inputs/ComplexAutocompleteInput.jsx'

import eventTypes from '/src/data/mission/stage/condition/event-types.json'

export default function EventConditionEditor({condition, updateData}) {
  return (
    <ComplexAutocompleteInput name="EventTypeAQN" label="Event Type" value={condition.EventTypeAQN} freeSolo
                              onChange={updateData} options={eventTypes} placeholder="Select event type"/>
  )
}