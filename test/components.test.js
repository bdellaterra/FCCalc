var test = require(process.env.JS_TEST_LIB).test

import $ from 'teaspoon'
import React from 'react'
import { jsdom } from 'jsdom';

import FCCalc from '../src/js/components/FCCalc'
import LCD from '../src/js/components/LCD'
import Numbers from '../src/js/components/Numbers'
import Operators from '../src/js/components/Operators'
import Row from '../src/js/components/Row'
import Col from '../src/js/components/Col'
import Set from '../src/js/components/Set'
import Key from '../src/js/components/Key'

// Setup DOM
const doc = jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});


test('FCCalc renders with class "calculator".', t => {
    const actual = $(<FCCalc />)
        .shallowRender()
        .find('div[className=calculator]')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('FCCalc contains 2 Rows of components.', t => {
    const actual = $(<FCCalc />)
        .shallowRender()
        .find('Row')
        .length
    const expected = 2
    t.is(actual, expected)
})

test('FCCalc contains an LCD display.', t => {
    const actual = $(<FCCalc />)
        .render()
        .find('LCD')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('FCCalc contains 2 Columns of Keys.', t => {
    const actual = $(<FCCalc />)
        .shallowRender()
        .find('Col')
        .length
    const expected = 2
    t.is(actual, expected)
})

test('Row renders with class "row".', t => {
    const actual = $(<Row />)
        .shallowRender()
        .find('div[className=row]')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('Col renders with class "column".', t => {
    const actual = $(<Col />)
        .shallowRender()
        .find('div[className=column]')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('Numbers renders with class "numbers".', t => {
    const actual = $(<Numbers />)
        .shallowRender()
        .find('div[className=numbers]')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('Numbers contains 4 sets of Keys.', t => {
    const actual = $(<Numbers />)
        .shallowRender()
        .find('Set')
        .length
    const expected = 4
    t.is(actual, expected)
})

test('Numbers contains 11 Keys total.', t => {
    const actual = $(<Numbers />)
        .shallowRender()
        .find('Key')
        .length
    const expected = 11
    t.is(actual, expected)
})

test('Operators renders with class "operators".', t => {
    const actual = $(<Operators />)
        .shallowRender()
        .find('div[className=operators]')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('Operators contains 2 sets of Keys.', t => {
    const actual = $(<Operators />)
        .shallowRender()
        .find('Set')
        .length
    const expected = 2
    t.is(actual, expected)
})

test('Operators contains 7 Keys total.', t => {
    const actual = $(<Operators />)
        .shallowRender()
        .find('Key')
        .length
    const expected = 7
    t.is(actual, expected)
})

test('Set renders with class "set".', t => {
    const actual = $(<Set />)
        .shallowRender()
        .find('div[className=set]')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('Key renders with class "key" inside class "slot".', t => {
    const actual = $(<Key />)
        .render()
        .find($.s`div[className=slot] > div[className=key]`)
        .length
    const expected = 1
    t.is(actual, expected)
})

test('LCD renders with class "lcd".', t => {
    const actual = $(<LCD />)
        .shallowRender()
        .find('div[className=lcd]')
        .length
    const expected = 1
    t.is(actual, expected)
})

test('LCD renders "display" prop as text.', t => {
    const props = { display: '123.45' }
    const actual = $(<LCD {...props} />)
        .shallowRender()
        .text()
    const expected = '123.45'
    t.is(actual, expected)
})

