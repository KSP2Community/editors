export function jsToCsv(obj) {
  const headers = Object.keys(obj[0])
  const rows = obj.map(obj => headers.map(header => obj[header]))
  const sanitizedRows = rows.map(row => row.map(cell => {
    if (cell.includes(',') || cell.includes('\n') || cell.includes('"')) {
      return `"${cell.replace(/"/g, '""')}"`
    }
    return cell
  }))
  return [headers, ...sanitizedRows].map(row => row.join(',')).join('\n')
}

export function csvToJs(csvData) {
  let parsedRows = []
  let currentRow = ''
  let insideQuotes = false

  for (let currentChar of csvData) {
    if (currentChar === '"' && !insideQuotes) {
      insideQuotes = true
      currentRow += currentChar
    } else if (currentChar === '"' && insideQuotes) {
      if (currentRow[currentRow.length - 1] === '"') {
        currentRow = currentRow.slice(0, -1)
      } else {
        insideQuotes = false
      }
      currentRow += currentChar
    } else if (currentChar === '\n' && !insideQuotes) {
      if (currentRow.trim() !== '') {
        parsedRows.push(currentRow)
      }
      currentRow = ''
    } else {
      currentRow += currentChar
    }
  }

  if (currentRow.trim() !== '') {
    parsedRows.push(currentRow)
  }

  const columnHeaders = parsedRows[0].split(',')
  return parsedRows.slice(1).map(row => {
    let parsedCells = []
    let currentCell = ''
    insideQuotes = false

    for (let currentChar of row) {
      if (currentChar === '"' && !insideQuotes) {
        insideQuotes = true
        currentCell += currentChar
      } else if (currentChar === '"' && insideQuotes) {
        if (currentCell[currentCell.length - 1] === '"') {
          currentCell = currentCell.slice(0, -1)
        } else {
          insideQuotes = false
        }
        currentCell += currentChar
      } else if (currentChar === ',' && !insideQuotes) {
        parsedCells.push(currentCell)
        currentCell = ''
      } else {
        currentCell += currentChar
      }
    }

    parsedCells.push(currentCell)
    let rowObject = {}

    columnHeaders.forEach((header, index) => {
      let cellValue = parsedCells[index]
      if (cellValue && cellValue.startsWith('"') && cellValue.endsWith('"')) {
        cellValue = cellValue.slice(1, -1).replace(/""/g, '"')
      }
      rowObject[header] = cellValue
    })

    return rowObject
  })
}

//
// const csvTestingData = `Key,Type,Desc,English,Spanish,$Context
// my/key/hello,Text,,Hello!,¡Hola!,This is how you say hello
// my/key/goodbye,Text,,Goodbye,Adiós,This is how you say goodbye
// my/key/yes,Text,,Yes,Sí,This is how you say yes
// my/key/no,Text,,No,No,"This is how
// you say no"
// my/key/long,Text,,"This is a long sentence, it has to contains commas, ""quotes"" and
//
//
// newlines as well!","Esta es una oración larga, tiene que contener comas, ""comillas"" y
//
//
// saltos de línea también!","This contains a ""long"" sentence"`
//
// const jsTestingData = [
//   {
//     Key: "my/key/hello",
//     Type: "Text",
//     Desc: "",
//     English: "Hello!",
//     Spanish: "¡Hola!",
//     $Context: "This is how you say hello"
//   },
//   {
//     Key: "my/key/goodbye",
//     Type: "Text",
//     Desc: "",
//     English: "Goodbye",
//     Spanish: "Adiós",
//     $Context: "This is how you say goodbye"
//   },
//   {
//     Key: "my/key/yes",
//     Type: "Text",
//     Desc: "",
//     English: "Yes",
//     Spanish: "Sí",
//     $Context: "This is how you say yes"
//   },
//   {
//     Key: "my/key/no",
//     Type: "Text",
//     Desc: "",
//     English: "No",
//     Spanish: "No",
//     $Context: `This is how
// you say no`
//   },
//   {
//     Key: "my/key/long",
//     Type: "Text",
//     Desc: "",
//     English: `This is a long sentence, it has to contains commas, "quotes" and\n\n\nnewlines as well!`,
//     Spanish: `Esta es una oración larga, tiene que contener comas, "comillas" y\n\n\nsaltos de línea también!`,
//     $Context: "This contains a \"long\" sentence"
//   }
// ]