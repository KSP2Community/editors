export function stringifyMission(missionData, isPatch) {
  let json = JSON.stringify(missionData, (key, value) => {
    if (key === '__uuid') {
      return undefined
    }

    if (value instanceof Object && Object.keys(value).length === 1
      && Object.prototype.hasOwnProperty.call(Object, value, '__uuid')) {
      return null
    }

    return value
  }, 2)

  if (!isPatch) {
    return json
  }

  return `@new("${missionData.ID}")
:missions {
  @set ${json.replace(/^/gm, '  ')};
}`
}

export function parseMission(missionString, isPatch) {
  if (!isPatch) {
    return JSON.parse(missionString)
  }

  const match = missionString.match(/\s*@new\("(.+?)"\)\n\s*:missions {\n\s*@set\s*(\{.+\});\n}/s)
  if (!match) {
    throw new Error('Invalid patch')
  }

  const [, , json] = match
  return JSON.parse(json)
}