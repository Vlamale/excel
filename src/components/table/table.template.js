import {defaultStyles} from '../../constants'
import {parse} from '../../core/parse'
import {toInlineStyles} from '../../core/utils'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24


function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})
    return `
  <div 
    class="cell" 
    contenteditable 
    data-col="${col}" 
    data-type="cell"
    data-id="${id}"
    data-value="${data || ''}"
    style="width:${width};${styles};"
  >
  ${parse(data) || ''}
  </div>
  `
  }
}

function toColumn({letter, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" 
    onmousedown="return false" style="width:${width}">
        ${letter}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content, state) {
  const height = getHeight(state, index)
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" 
  data-type="resizable" 
  data-row="${index}" 
  style="height:${height}"
  >
  <div class="row-info" onmousedown="return false">
  ${index ? index : ''}
  ${resize}
  </div>
  <div class="row-data">${content}</div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(letter, index) {
    return {
      letter, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, state.rowState))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }
  return rows.join('')
}