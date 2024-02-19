export function truncate(text, length) {
  if (text.length <= length) {
    return text
  }

  return text.slice(0, length) + '...'
}

export function tryParseFloat(value) {
  return isNaN(parseFloat(value)) ? value : parseFloat(value)
}