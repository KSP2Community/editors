import * as React from 'react'
import {tryParseFloat} from '../../../utils/strings.js'
import {Box, FormControl, FormLabel} from '@mui/joy'
import TextInput from './TextInput.jsx'

export default function Vector3Input({label, vector, updateData}) {
  const updateFloatData = (name, value) => {
    updateData(name, tryParseFloat(value))
  }

  return <>
    <FormControl>
      <FormLabel>
        {label}
      </FormLabel>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2
      }}>
        <TextInput name="x" label="X" type="number" value={vector.x} onChange={updateFloatData} sx={{flexGrow: 1}}/>
        <TextInput name="y" label="Y" type="number" value={vector.y} onChange={updateFloatData} sx={{flexGrow: 1}}/>
        <TextInput name="z" label="Z" type="number" value={vector.z} onChange={updateFloatData} sx={{flexGrow: 1}}/>
      </Box>
    </FormControl>
  </>
}