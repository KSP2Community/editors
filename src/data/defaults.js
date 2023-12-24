export const missionDefaults = {
  ID: '',
  MissionGroup: '',
  name: '',
  description: '',
  GameModeFeatureId: 'ExplorationMissions',
  type: 'Primary',
  Owner: 'Agency',
  state: 'Active',
  missionScript: '',
  missionStages: [],
  currentStageIndex: 0,
  Hidden: false,
  MissionGranterKey: '',
  TriumphLoopVideoKey: '',
  VisibleRewards: true,
  pendingCompletionTest: false,
  maxStageID: -1,
  uiDisplayType: 'Default',
  ExceptionBranches: [],
  PreRequisiteBranches: [],
  ContentBranches: [],
  MissionSaveAssetKey: ''
}

export const stageDefaults = {
  name: '',
  description: '',
  Objective: '',
  DisplayObjective: true,
  RevealObjectiveOnActivate: false,
  MissionRewardType: "None",
  RewardAmount: null,
  MissionReward: {
    MissionRewardDefinitions: []
  },
  IgnoreExceptionBranches: false,
  actions: [],

}

export const rewardDefaults = {
  MissionRewardType: "SciencePoints",
  "RewardAmount": 0,
  "RewardKey": null,
}