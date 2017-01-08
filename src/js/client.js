import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import FCCalc from './components/FCCalc'
import store from './store'
import reducer, { input, sign, read, write, operator, clear, allclear } from './reducers'


// ReactDOM.render(<App />, document.getElementById('App');
function subscriber() {
  render(
    <FCCalc value={store.getState().buffer} />,
    document.getElementById("FCCalc")
  )
}

store.subscribe(subscriber)
store.dispatch(operator('='))

