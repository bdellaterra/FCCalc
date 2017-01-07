import { combineReducers as combine } from 'redux'
import { createAction, createReducer } from 'redux-act'

const allclear = createAction('Completely reset all stored data')

const clear = createAction('Clear the buffer')
const input = createAction('Append numeric data to the buffer')
const sign = createAction('Toggle sign of current buffer')
const read = createAction('Store value from the buffer')
// const write = createAction('Send stored value to the buffer')

// const operator = createAction('Store pending operator')
// const compute = createAction('Apply buffer value to stored value using stored operation ')
// 
// const add = createAction('Add current value to stored value');
// const subtract = createAction('Subtract current value from stored value');
// const multiply = createAction('Multiply stored value by current value');
// const divide = createAction('Divide stored value by current value');


// Build string buffer as number keys are pressed,
// applying formatting rules to preserve validity
function formatBuf(b) {
  // remove unnecessary leading zeros,
  // accounting for possible negative sign
  b = b.replace( /^(-)?0(\d)/, '$1$2' )
  // remove all but first decimal
  b = b.replace('.', '~').replace(/\./, '').replace('~', '.')
  return b
}

function toggleBufSign(b) {
  return b.charAt(0) === '-' ? b.substring(1) : '-' + b
}

const initialBuffer = '0'
const initialValue = 0
const initialState = { buffer: initialBuffer, value: initialValue }
const reducer = createReducer({
  [input]: (state, payload) => ({
    ...state,
    buffer: formatBuf(state.buffer + payload)
  }),
  [sign]: (state) => ({
    ...state,
    buffer: toggleBufSign(state.buffer)
  }),
  [read]: (state) => ({
    ...state,
    value: parseFloat(state.buffer)
  }),
  [clear]: (state) => ({
    ...state,
    buffer: initialBuffer
  }),
  [allclear]: (state) => initialState
}, initialState);

export { input, sign, read, clear, allclear }
export default reducer
