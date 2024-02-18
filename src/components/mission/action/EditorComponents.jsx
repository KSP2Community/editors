import TextInput from '../inputs/TextInput.jsx'

export function ActivateMissionAction({action, updateData}) {
  return (
    <TextInput name="TargetMissionID" label="Target Mission ID" value={action.TargetMissionID} onChange={updateData}/>
  )
}