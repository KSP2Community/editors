import {FormControl, FormLabel, Switch} from '@mui/joy'

export default function Toggle({name, label, value, onChange}) {
  return (
    <FormControl
      orientation="horizontal"
      sx={{ justifyContent: 'space-between' }}
    >
      <FormLabel>{label}</FormLabel>
      <Switch
        name={name}
        startDecorator={value ? 'Yes' : 'No'}
        checked={value}
        onChange={e => onChange(name, e.target.checked)}
      />
    </FormControl>
  )
}