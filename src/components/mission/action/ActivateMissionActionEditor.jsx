import TextInput from '../inputs/TextInput.jsx'

export default function ActivateMissionActionEditor({action, updateData}) {
  return (
    <TextInput name="TargetMissionID" label="Target Mission ID" value={action.TargetMissionID} onChange={updateData}/>
  )
}