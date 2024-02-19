import {tryParseFloat} from '../../../utils/strings.js'
import {Box} from '@mui/joy'
import TextInput from './TextInput.jsx'
import * as React from 'react'

export default function Vector2Input({vector, updateData}) {
  const updateFloatData = (name, value) => {
    updateData(name, tryParseFloat(value))
  }

  return <>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: 2
    }}>
      <TextInput name="x" type="number" label="X" value={vector.x} onChange={updateFloatData} sx={{flexGrow: 1}}/>
      <TextInput name="y" type="number" label="Y" value={vector.y} onChange={updateFloatData} sx={{flexGrow: 1}}/>
    </Box>
  </>
}