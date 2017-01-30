import { combineReducers as combine } from 'redux'
import { createAction, createReducer } from 'redux-act'

const input = createAction('Append numeric data to the buffer')
const sign = createAction('Toggle sign of current buffer')
const read = createAction('Store value from the buffer')
const write = createAction('Send stored value to the buffer')
const operator = createAction('Handle input of various operators')
const clear = createAction('Clear the buffer')
const allclear = createAction('Completely reset all state')

const initialValue = 0
const initialBuffer = formatBuf(initialValue.toString())
const initialOperator = '='
const initialBufWillReset = false

const initialState = {
  buffer: initialBuffer,
  value: initialValue,
  operator: initialOperator,
  bufWillReset: initialBufWillReset,
}

const errorBuffer = 'Err'
const errorState = {
  buffer: errorBuffer,
  value: initialValue,
  operator: initialOperator,
  bufWillReset: true,
}

const maxBufLen = 14


// Build string buffer as number keys are pressed,
// applying formatting rules to preserve validity
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


function handleError(state) {
  let hasError = 0
  // Number too large
  if ( state.value.toString().split('.')[0].length > maxBufLen ) {
    hasError = 1
  }
  return hasError ? errorState : state
}


function handleOperator( state, payload ) {
  let nextValue = computeNextValue(state)
  let nextOperator = payload
  let nextBuffer = formatBuf(nextValue.toString())
  let nextState = handleError({
    ...state,
    buffer: nextBuffer,
    value: nextValue,
    operator: nextOperator,
    bufWillReset: true
  })
  return nextState
}


const reducer = createReducer({
  [input]: (state, payload) => ({
    ...state,
    buffer: state.bufWillReset ? formatBuf(payload) : formatBuf(state.buffer + payload),
    bufWillReset: false
  }),
  // TODO: Implement sign key
  // [sign]: (state) => ({
  //   ...state,
  //   buffer: toggleBufSign(state.buffer)
  // }),
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
  [allclear]: () => initialState
}, initialState);


export { input, sign, read, write, operator, clear, allclear, maxBufLen, initialState }
export default reducer
