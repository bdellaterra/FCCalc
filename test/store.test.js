var test = require(process.env.JS_TEST_LIB).test

import { createStore } from 'redux'
import reducer,
       { input, operator, clear, allclear, initialState }
       from '../src/js/reducers'


test('Store defaults to expected initial state.', t => {
    let store = createStore(reducer)
    t.deepEqual(store.getState(), initialState)
})

test('Store dipatches numeric input.', t => {
    let store = createStore(reducer)
    store.dispatch(input('1'))
    store.dispatch(input('.'))
    store.dispatch(input('2'))
    store.dispatch(input('3'))
    t.deepEqual(store.getState().buffer, '1.23')
})

test('Store dipatches numeric operations.', t => {
    let store = createStore(reducer)
    store.dispatch(input('1'))
    store.dispatch(operator('+'))
    store.dispatch(input('2'))
    store.dispatch(operator('/'))
    store.dispatch(input('3'))
    store.dispatch(operator('*'))
    store.dispatch(input('5'))
    store.dispatch(operator('-'))
    store.dispatch(input('5'))
    store.dispatch(operator('='))
    t.deepEqual(store.getState().buffer, '0')
})

test("Store dipatches 'clear' operation.", t => {
    let store = createStore(reducer)
    store.dispatch(input('1'))
    store.dispatch(input('.'))
    store.dispatch(input('2'))
    store.dispatch(input('3'))
    store.dispatch(clear())
    t.deepEqual(store.getState().buffer, initialState.buffer)
})

test("Store dipatches 'allclear' operation.", t => {
    let store = createStore(reducer)
    store.dispatch(input('5'))
    store.dispatch(operator('*'))
    store.dispatch(input('5'))
    store.dispatch(operator('/'))
    store.dispatch(allclear())
    t.deepEqual(store.getState(), initialState)
})

