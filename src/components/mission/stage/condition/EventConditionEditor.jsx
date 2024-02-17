import TextInput from '../../inputs/TextInput.jsx'

export default function EventConditionEditor({condition, updateData}) {
  return <>
    <TextInput name="EventTypeAQN" label="Event Type" value={condition.EventTypeAQN} onChange={updateData}/>
  </>;
}