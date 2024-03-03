import {FormControl, FormLabel, Input, Textarea} from '@mui/joy'

export default function TextInput({name, label, value, onChange, type = "text", multiline = false}) {
  return (
    <FormControl>
      <FormLabel>
        {label}
      </FormLabel>
      {multiline ? (
        <Textarea
          name={name}
          value={value}
          onChange={e =>
            onChange(name, type === "number" ? parseFloat(e.target.value) : e.target.value)}
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={e =>
            onChange(name, type === "number" ? parseFloat(e.target.value) : e.target.value)}
        />
      )}
    </FormControl>
  )
}