export function getClassNameFromAQN(aqn) {
  const className = aqn.split(",")[0]
  const classNameParts = className.split(".")
  return classNameParts[classNameParts.length - 1]
}