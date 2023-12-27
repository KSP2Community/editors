import {FormControl, Select, FormLabel, Option} from '@mui/joy'

export default function DropdownInput({name, label, options, value, onChange}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        name={name}
        value={value}
        onChange={(_, newValue) => onChange(name, newValue)}
      >
        {options instanceof Array ?
          options.map(option => (
            <Option key={option} value={option}>{option}</Option>
          )) :
          Object.entries(options).map(([key, value]) => (
            <Option key={option} value={key}>{value}</Option>
          ))}
      </Select>
    </FormControl>
  )
}