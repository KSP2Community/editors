import {Typography} from '@mui/joy'
import * as React from 'react'
import DropdownInput from '../inputs/DropdownInput.jsx'

import contentBranchIDKeys from '/src/data/mission/branch/content-branch-id-keys.json'
import ActionEditor from '../action/ActionEditor.jsx'

export default function ContentBranchEditor({branch, updateBranchData}) {
  return <>
    <DropdownInput name="ID" label="ID" options={contentBranchIDKeys} value={branch.ID} onChange={updateBranchData}/>

    <Typography level="h5" component="h3">Actions</Typography>
    <ActionEditor/>
  </>
}