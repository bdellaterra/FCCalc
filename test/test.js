var test = require(process.env.JS_TEST_LIB).test

import { createStore } from 'redux'
import reducer,
       { input, sign, read, write, operator, clear, allclear, maxBufLen, initialState }
       from '../src/js/reducers'


test('Reducer defaults to expected initial state.', t => {
    t.deepEqual(reducer(), initialState)
})

test('Reducer feeds numeric input to buffer.', t => {
    const state = reducer(undefined, {type: input, payload: '1'})
    t.deepEqual(state.buffer, '1')
})

test('Reducer feeds numeric inputs to buffer until reaching max-length.', t => {
    let state = reducer()
    state = reducer(state, {type: input, payload: '1'})
    state = reducer(state, {type: input, payload: '2'})
    state = reducer(state, {type: input, payload: '3'})
    state = reducer(state, {type: input, payload: '4'})
    state = reducer(state, {type: input, payload: '5'})
    state = reducer(state, {type: input, payload: '6'})
    state = reducer(state, {type: input, payload: '7'})
    state = reducer(state, {type: input, payload: '8'})
    state = reducer(state, {type: input, payload: '9'})
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: input, payload: '1'})
    state = reducer(state, {type: input, payload: '2'})
    state = reducer(state, {type: input, payload: '3'})
    state = reducer(state, {type: input, payload: '4'})
    state = reducer(state, {type: input, payload: '5'})
    state = reducer(state, {type: input, payload: '6'})
    state = reducer(state, {type: input, payload: '7'})
    state = reducer(state, {type: input, payload: '8'})
    state = reducer(state, {type: input, payload: '9'})
    t.deepEqual(state.buffer, '1234567890123456789'.slice(0, maxBufLen))
})

test('Reducer trims leading zeroes from integer.', t => {
    let state = reducer()
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: input, payload: '1'})
    state = reducer(state, {type: input, payload: '2'})
    state = reducer(state, {type: input, payload: '3'})
    t.deepEqual(state.buffer, '123')
})

test('Reducer leaves leading zero before decimal.', t => {
    let state = reducer()
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: input, payload: '.'})
    state = reducer(state, {type: input, payload: '1'})
    state = reducer(state, {type: input, payload: '2'})
    state = reducer(state, {type: input, payload: '3'})
    t.deepEqual(state.buffer, '0.123')
})

test('Reducer ignores additional decimal points.', t => {
    let state = reducer()
    state = reducer(state, {type: input, payload: '.'})
    state = reducer(state, {type: input, payload: '.'})
    state = reducer(state, {type: input, payload: '1'})
    state = reducer(state, {type: input, payload: '.'})
    state = reducer(state, {type: input, payload: '.'})
    state = reducer(state, {type: input, payload: '2'})
    state = reducer(state, {type: input, payload: '3'})
    state = reducer(state, {type: input, payload: '.'})
    state = reducer(state, {type: input, payload: '.'})
    t.deepEqual(state.buffer, '0.123')
})

test('Reducer can read numeric value from buffer string.', t => {
    let state = reducer({ ...initialState, buffer: '0.123' })
    state = reducer(state, {type: read})
    t.deepEqual(state.value, 0.123)
})

test('Reducer can write numeric value into buffer string.', t => {
    let state = reducer({ ...initialState, value: 0.123 })
    state = reducer(state, {type: write})
    t.deepEqual(state.buffer, '0.123')
})

test('Reducer holds operator-pending state.', t => {
    let state = reducer({ ...initialState, buffer: '100' })
    state = reducer(state, {type: operator, payload: '+'})
    t.deepEqual(state, { ...state, operator: '+', bufWillReset: true })
    state = reducer(state, {type: operator, payload: '-'})
    t.deepEqual(state, { ...state, operator: '-', bufWillReset: true })
    state = reducer(state, {type: operator, payload: '*'})
    t.deepEqual(state, { ...state, operator: '*', bufWillReset: true })
    state = reducer(state, {type: operator, payload: '/'})
    t.deepEqual(state, { ...state, operator: '/', bufWillReset: true })
})

test("Reducer finalizes computation after '=' operator.", t => {
    let state = reducer({ ...initialState, buffer: '100' })
    state = reducer(state, {type: operator, payload: '+'})
    state = reducer(state, {type: operator, payload: '='})
    t.deepEqual(state, { ...state,
        value: parseFloat(state.buffer), operator: '=', bufWillReset: true })
})

test('Reducer adds stored value to buffer.', t => {
    let state = reducer({ ...initialState, buffer: '5' })
    state = reducer(state, {type: operator, payload: '+'})
    state = reducer(state, {type: input, payload: '5'})
    state = reducer(state, {type: operator, payload: '+'})
    t.deepEqual(state, { ...state, buffer: '10' })
})

test('Reducer subtracts stored value from buffer.', t => {
    let state = reducer({ ...initialState, buffer: '10' })
    state = reducer(state, {type: operator, payload: '-'})
    state = reducer(state, {type: input, payload: '4'})
    state = reducer(state, {type: operator, payload: '-'})
    t.deepEqual(state, { ...state, buffer: '6' })
})

test('Reducer multiplies stored value by buffer.', t => {
    let state = reducer({ ...initialState, buffer: '3' })
    state = reducer(state, {type: operator, payload: '*'})
    state = reducer(state, {type: input, payload: '4'})
    state = reducer(state, {type: operator, payload: '='})
    t.deepEqual(state, { ...state, buffer: '12' })
})

test('Reducer divides stored value by buffer.', t => {
    let state = reducer({ ...initialState, buffer: '8' })
    state = reducer(state, {type: operator, payload: '/'})
    state = reducer(state, {type: input, payload: '4'})
    state = reducer(state, {type: operator, payload: '='})
    t.deepEqual(state, { ...state, buffer: '2' })
})

test("Reducer resolves div-by-zero to 'Infinity'.", t => {
    let state = reducer({ ...initialState, buffer: '8' })
    state = reducer(state, {type: operator, payload: '/'})
    state = reducer(state, {type: input, payload: '0'})
    state = reducer(state, {type: operator, payload: '='})
    t.deepEqual(state, { ...state, buffer: 'Infinity' })
})

test("Reducer reports overflow as 'Err'.", t => {
    let state = reducer({ ...initialState, buffer: '9'.repeat(maxBufLen) })
    state = reducer(state, {type: operator, payload: '+'})
    state = reducer(state, {type: input, payload: '1'})
    state = reducer(state, {type: operator, payload: '='})
    t.deepEqual(state, { ...state, buffer: 'Err' })
})

test('Reducer can clear the buffer.', t => {
    let state = reducer({ ...initialState, buffer: '0.123' })
    state = reducer(state, {type: clear})
    t.deepEqual(state.buffer, '0')
})

test('Reducer can clear all state.', t => {
    let nextState = { ...initialState, buffer: '0.123', operator: '+', bufWillReset: true }
    let state = reducer({ ...initialState, ...nextState })
    state = reducer(state, {type: allclear})
    t.deepEqual(state, initialState)
})

