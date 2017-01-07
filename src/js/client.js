import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Rex from './components/Rex'
import store from './store'
import reducer, { input, sign, read, write, operator, clear, allclear } from './reducers'
console.clear()
console.log('Starting...')

// ReactDOM.render(<App />, document.getElementById('App');
function subscriber() {
  render(
    <Rex />,
    document.getElementById("Rex")
  )
}

store.subscribe(subscriber)


store.dispatch(operator('='))
console.dir(store.getState())

store.dispatch(input('1'))
store.dispatch(input('.'))
store.dispatch(input('2'))
store.dispatch(input('3'))
store.dispatch(clear())
store.dispatch(sign())
store.dispatch(input('4'))
store.dispatch(input('.'))
store.dispatch(input('5'))
store.dispatch(input('6'))
store.dispatch(input('7'))
store.dispatch(operator('+'))
store.dispatch(input('5'))
store.dispatch(operator('+'))
store.dispatch(input('1'))
store.dispatch(input('0'))
store.dispatch(operator('='))

console.dir(store.getState())

store.dispatch(allclear())
// store.dispatch(allclear())

console.dir(store.getState())
