const CODES = {
  A: 65,
  Z: 90
}

function toCell(index) {
  return `
  <div class="cell" contenteditable="" data-index="${index}"></div>
  `
}

function toColumn(letter, index) {
  return `
    <div class="column" data-type="resizable" data-index="${index}" 
    onmousedown="return false">
        ${letter}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(content, count = '') {
  const resize = count ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" data-type="resizable">
  <div class="row-info" onmousedown="return false">
  ${count}
  ${resize}
  </div>
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
    worksCols.push(toCell(i))
    cols.push(toColumn(letter, i))
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