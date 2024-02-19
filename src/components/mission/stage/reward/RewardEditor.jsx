import * as React from 'react'
import DropdownInput from '../../inputs/DropdownInput.jsx'
import TextInput from '../../inputs/TextInput.jsx'
import rewardTypes from '/src/data/mission/stage/reward/reward-types.json'

export default function RewardEditor({reward, updateRewardData}) {
  return <>
    <DropdownInput name="MissionRewardType" label="Type" options={rewardTypes} value={reward.MissionRewardType}
                   onChange={updateRewardData}/>
    <TextInput name="RewardAmount" type="number" label="Amount" value={reward.RewardAmount}
               onChange={updateRewardData}/>
  </>
}