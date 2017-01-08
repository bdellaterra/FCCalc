import { combineReducers as combine } from 'redux'
import { createAction, createReducer } from 'redux-act'

const input = createAction('Append numeric data to the buffer')
const sign = createAction('Toggle sign of current buffer')
const read = createAction('Store value from the buffer')
const write = createAction('Send stored value to the buffer')
const operator = createAction('Handle input of various operators')
const clear = createAction('Clear the buffer')
const allclear = createAction('Completely reset all stored data')


// Build string buffer as number keys are pressed,
// applying formatting rules to preserve validity
const maxBufLen = 14
function formatBuf(b) {
  // remove unnecessary leading zeros,
  // accounting for possible negative sign
  b = b.replace( /^(-)?0(\d+)/, '$1$2' )
  // remove all but first decimal
  b = b.replace('.', '~').replace(/\./, '').replace('~', '.')
  // Return string, respecting character-limit
  return b.slice(0, maxBufLen)
}


function toggleBufSign(b) {
  return formatBuf( b.charAt(0) === '-' ? b.substring(1) : '-' + b )
}


// TODO: Handle operator precedence
function computeNextValue(state) {
  switch(state.operator) {
    // Only one-line returns here
    case '+':
      return state.value + parseFloat(state.buffer)
    case '-':
      return state.value - parseFloat(state.buffer)
    case '*':
      return state.value * parseFloat(state.buffer)
    case '/': 
      return state.value / parseFloat(state.buffer)
    case '=': 
    default:
      // Consider adding missing-type exception here later...
      return parseFloat(state.buffer)
  }
}


// TODO: Error for results that can't be displayed properly on LCD
function handleOperator( state, payload ) {
  let nextValue = computeNextValue(state)
  let nextOperator = payload
  let nextBuffer = formatBuf(nextValue.toString())
  return {
    ...state,
    buffer: nextBuffer,
    value: nextValue,
    operator: nextOperator,
    bufToReset: true
  }
}


const initialValue = 0
const initialBuffer = formatBuf(initialValue.toString())
const initialOperator = '='
const initialBufToReset = false
const initialState = {
  buffer: initialBuffer,
  value: initialValue,
  operator: initialOperator,
  bufToReset: initialBufToReset,
}


const reducer = createReducer({
  [input]: (state, payload) => ({
    ...state,
    buffer: state.bufToReset ? formatBuf(payload) : formatBuf(state.buffer + payload),
    bufToReset: false
  }),
  [sign]: (state) => ({
    ...state,
    buffer: toggleBufSign(state.buffer)
  }),
  [read]: (state) => ({
    ...state,
    value: parseFloat(state.buffer)
  }),
  [write]: (state) => ({
    ...state,
    buffer: formatBuf(state.value.toString())
  }),
  [operator]: handleOperator,
  [clear]: (state) => ({
    ...state,
    buffer: initialBuffer
  }),
  [allclear]: state => initialState
}, initialState);


export { input, sign, read, write, operator, clear, allclear }
export default reducer
