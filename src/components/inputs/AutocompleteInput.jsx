import Autocomplete from '@mui/joy/Autocomplete'
import {FormControl, FormLabel} from '@mui/joy'

export default function AutocompleteInput({name, label, options, value, onChange}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        freeSolo
        name={name}
        options={options}
        value={value}
        onChange={(_, newValue) => onChange(name, newValue)}
      />
    </FormControl>
  )
}