import * as React from 'react'
import {Typography} from '@mui/joy'
import {v4 as uuidv4} from 'uuid'

import ConditionEditor from './condition/ConditionEditor.jsx'
import RewardEditor from './reward/RewardEditor.jsx'
import ActionEditor, {getActionLabel} from '../action/ActionEditor.jsx'
import TextInput from '../inputs/TextInput.jsx'
import Toggle from '../inputs/Toggle.jsx'
import rewardDefaults from '/src/data/mission/stage/reward/reward-defaults.json'
import ArrayInput from '../inputs/ArrayInput.jsx'

export default function StageEditor({stage, updateStageData}) {
  return <>
    <TextInput name="StageID" label="Stage ID" type="number" value={stage.StageID} onChange={updateStageData}/>
    <TextInput name="name" label="Name" value={stage.name} onChange={updateStageData}/>
    <TextInput name="description" label="Description" value={stage.description} onChange={updateStageData}/>
    <TextInput name="Objective" label="Objective Localization Key" value={stage.Objective}
               onChange={updateStageData}/>
    <Toggle name="DisplayObjective" label="Display Objective" value={stage.DisplayObjective}
            onChange={updateStageData}/>
    <Toggle name="RevealObjectiveOnActivate" label="Reveal Objective On Activate"
            value={stage.RevealObjectiveOnActivate} onChange={updateStageData}/>

    <Typography level="h5" component="h3">Condition</Typography>
    <ConditionEditor condition={stage.scriptableCondition} updateData={
      condition => updateStageData("scriptableCondition", condition === null ? null : {...condition})
    }/>

    <ArrayInput level={1}
                array={stage.MissionReward.MissionRewardDefinitions}
                title="Mission rewards"
                addButtonText="Add reward"
                noItemsText="No mission rewards"
                itemTitle={({item}) =>
                  item.MissionRewardType === 'None' ? 'None' : `${item.RewardAmount} ${item.MissionRewardType}`
                }
                addButtonClick={() => {
                  const newRewardDefinitions = [
                    ...stage.MissionReward.MissionRewardDefinitions,
                    {...rewardDefaults, __uuid: uuidv4()}
                  ]
                  updateStageData("MissionReward", {
                    ...stage.MissionReward,
                    MissionRewardDefinitions: newRewardDefinitions
                  })
                }}
                updateData={index => (name, value) => {
                  const newRewardDefinitions = [...stage.MissionReward.MissionRewardDefinitions]
                  newRewardDefinitions[index][name] = value
                  const newRewards = {...stage.MissionReward, MissionRewardDefinitions: newRewardDefinitions}
                  updateStageData("MissionReward", newRewards)
                }}
                deleteData={index => {
                  const newRewardDefinitions = [...stage.MissionReward.MissionRewardDefinitions]
                  newRewardDefinitions.splice(index, 1)
                  const newRewards = {...stage.MissionReward, MissionRewardDefinitions: newRewardDefinitions}
                  updateStageData("MissionReward", newRewards)
                }}
                renderComponent={({item, updateData}) => <RewardEditor reward={item} updateRewardData={updateData}/>}
    />

    <ArrayInput level={1}
                array={stage.actions}
                title="Actions"
                addButtonText="Add action"
                noItemsText="No action"
                itemTitle={getActionLabel}
                addButtonClick={() => {
                  updateStageData("actions", [
                    ...stage.actions,
                    {__uuid: uuidv4()}
                  ])
                }}
                updateData={index => value => {
                  const newActions = [...stage.actions]
                  newActions[index] = value
                  updateStageData("actions", newActions)
                }}
                deleteData={index => {
                  const newActions = [...stage.actions]
                  newActions.splice(index, 1)
                  updateStageData("actions", newActions)
                }}
                renderComponent={({item, updateData}) => <ActionEditor action={item} updateData={updateData}/>}
    />
  </>
}