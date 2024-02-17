import {Typography} from '@mui/joy'
import * as React from 'react'
import DropdownInput from '../inputs/DropdownInput.jsx'

import branchIDKeys from '/src/data/mission/content-branch/content-branch-id-keys.json'
import ActionEditor from '../action/ActionEditor.jsx'

export default function BranchEditor({branch, updateBranchData}) {
  return <>
    <DropdownInput name="ID" label="ID" options={branchIDKeys} value={branch.ID} onChange={updateBranchData}/>

    <Typography level="h5" component="h3">Actions</Typography>
    <ActionEditor/>
  </>
}