import * as React from 'react'
import DropdownInput from '../inputs/DropdownInput.jsx'

import contentBranchIDKeys from '/src/data/mission/branch/content-branch-id-keys.json'
import ActionEditor, {getActionLabel} from '../action/ActionEditor.jsx'
import ArrayInput from '../inputs/ArrayInput.jsx'
import {v4 as uuidv4} from 'uuid'

export default function ContentBranchEditor({branch, updateBranchData}) {
  return <>
    <DropdownInput name="ID" label="ID" options={contentBranchIDKeys} value={branch.ID} onChange={updateBranchData}/>

    <ArrayInput level={1}
                array={branch.actions}
                title="Actions"
                addButtonText="Add action"
                noItemsText="No action"
                itemTitle={getActionLabel}
                addButtonClick={() => {
                  updateBranchData("actions", [
                    ...branch.actions,
                    {__uuid: uuidv4()}
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