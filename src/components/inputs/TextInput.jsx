import {FormControl, FormLabel, Input} from '@mui/joy'
import * as React from 'react'

export default function TextInput({name, label, value, onChange, type = "text"}) {
  return (
    <FormControl>
      <FormLabel>
        {label}
      </FormLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
      />
    </FormControl>
  )
}