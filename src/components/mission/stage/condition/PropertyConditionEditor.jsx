import Toggle from '../../inputs/Toggle.jsx'
import TextInput from '../../inputs/TextInput.jsx'
import DropdownInput from '../../inputs/DropdownInput.jsx'
import ComplexAutocompleteInput from '../../inputs/ComplexAutocompleteInput.jsx'

import propertyTypes from '/src/data/mission/stage/condition/property-types.json'
import propertyOperators from '/src/data/mission/stage/condition/property-operators.json'

export default function PropertyConditionEditor({condition, updateData}) {
  return <>
    <ComplexAutocompleteInput name="PropertyTypeAQN" label="Property Type" value={condition.PropertyTypeAQN} freeSolo
                              onChange={updateData} options={propertyTypes} placeholder="Select property type"/>
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