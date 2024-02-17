import ArrayInput from '../../inputs/ArrayInput.jsx'
import DropdownInput from '../../inputs/DropdownInput.jsx'

import conditionSetOperators from '/src/data/mission/stage/condition/condition-set-operator.json'
import ConditionEditor from './ConditionEditor.jsx'

export default function ConditionSetEditor({condition, updateData}) {
  return <>
    <DropdownInput name="ConditionMode" label="Condition Mode" options={conditionSetOperators}
                   value={condition.ConditionMode} onChange={updateData}/>
    <ArrayInput level={1}
                array={condition.Children}
                title="Condition children"
                addButtonText="Add condition"
                noItemsText="No conditions"
                itemTitle={({index}) => `Condition #${index + 1}`}
                addButtonClick={() => {
                  updateData("Children", [
                    ...condition.Children,
                    null
                  ])
                }}
                updateData={index => value => {
                  const newConditions = [...condition.Children]
                  newConditions[index] = value
                  updateData("Children", newConditions)
                }}
                deleteData={index => {
                  const newConditions = [...condition.Children]
                  newConditions.splice(index, 1)
                  updateData("Children", newConditions)
                }}
                renderComponent={({item, updateData}) => <ConditionEditor condition={item} updateData={updateData}/>}
    />
  </>
}