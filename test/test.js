var test = require(process.env.JS_TEST_LIB).test

import store from '../src/js/store'

test('Placeholder test always passes', t => {
    t.pass()
})

test('bar', async t => {
    const bar = Promise.resolve('bar')
    t.is(await bar, 'bar')
})

