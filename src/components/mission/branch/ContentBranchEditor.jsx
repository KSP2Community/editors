import {Typography} from '@mui/joy'
import * as React from 'react'
import DropdownInput from '../inputs/DropdownInput.jsx'

import contentBranchIDKeys from '/src/data/mission/branch/content-branch-id-keys.json'
import ActionEditor from '../action/ActionEditor.jsx'
import ArrayInput from '../inputs/ArrayInput.jsx'

export default function ContentBranchEditor({branch, updateBranchData}) {
  return <>
    <DropdownInput name="ID" label="ID" options={contentBranchIDKeys} value={branch.ID} onChange={updateBranchData}/>

    <ArrayInput level={1}
                array={branch.actions}
                title="Actions"
                addButtonText="Add action"
                noItemsText="No action"
                itemTitle={({index}) => `Action #${index + 1}`}
                addButtonClick={() => {
                  updateBranchData("actions", [
                    ...branch.actions,
                    null
                  ])
                }}
                updateData={index => value => {
                  const newActions = [...branch.actions]
                  newActions[index] = value
                  updateBranchData("actions", newActions)
                }}
                deleteData={index => {
                  const newActions = [...branch.actions]
                  newActions.splice(index, 1)
                  updateBranchData("actions", newActions)
                }}
                renderComponent={({item, updateData}) => <ActionEditor action={item} updateData={updateData}/>}
    />
  </>
}