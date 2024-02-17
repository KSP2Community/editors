import AutocompleteInput from '../../inputs/AutocompleteInput.jsx'

import propertyTypes from '/src/data/mission/stage/condition/property-type.json'
import Toggle from '../../inputs/Toggle.jsx'
import TextInput from '../../inputs/TextInput.jsx'
import DropdownInput from '../../inputs/DropdownInput.jsx'

import propertyOperators from '/src/data/mission/stage/condition/property-operator.json'

export default function PropertyConditionEditor({condition, updateData}) {
  return <>
    <AutocompleteInput name="PropertyTypeAQN" label="Property Type" value={condition.PropertyTypeAQN}
                       onChange={updateData} options={propertyTypes}/>
    <Toggle name="RequireCurrentValue" label="Require Current Value" value={condition.RequireCurrentValue}
            onChange={updateData}/>
    <TextInput name="TestWatchedstring" label="Watched String Value" value={condition.TestWatchedstring}
               onChange={updateData}/>
    <TextInput name="TestWatchedValue" label="Watched Float Value" value={condition.TestWatchedValue}
               onChange={updateData} type="number"/>
    <TextInput name="TestWatchedInt" label="Watched Integer Value" value={condition.TestWatchedInt}
               onChange={updateData} type="number"/>
    <Toggle name="TestWatchedBool" label="Watched Boolean Value" value={condition.TestWatchedBool}
            onChange={updateData}/>
    <DropdownInput name="propOperator" label="Operator" value={condition.propOperator} onChange={updateData}
                   options={propertyOperators}/>
    <Toggle name="isInput" label="Use Input String" value={condition.isInput} onChange={updateData}/>
    <TextInput name="Inputstring" label="Input String" value={condition.Inputstring} onChange={updateData}/>
  </>
}