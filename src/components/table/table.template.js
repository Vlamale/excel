const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
  <div class="cell" contenteditable=""></div>
  `
}

function createCol(letter) {
  return `
    <div class="column">
        ${letter}
    </div>
    `
}

function createRow(content, count = '') {
  return `
  <div class="row">
  <div class="row-info">${count}</div>
  <div class="row-data">${content}</div>
  </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A
  const rows = []
  const cols = []
  const worksCols = []

  // Generates letters in the first line
  for (let i = 0; i <= colsCount; i++) {
    const letter = String.fromCharCode(CODES.A + i)
    worksCols.push(toCell())
    cols.push(createCol(letter))
  }
  // Appends the generated string as the first element of the array
  rows.push(createRow(cols.join('')))

  // Generates rows based on the "rowsCount" parameter specified
  // in the function argument
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(worksCols.join(''), i+1))
  }
  return rows.join('')
}