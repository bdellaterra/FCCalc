import React from 'react'
import { render } from 'react-dom'

import styles from '../css/FCCalc.css'
import FCCalc from './components/FCCalc'
import store from './store'
import reducer, { input, sign, read, write, operator, clear, allclear } from './reducers'


function watcher() {
  render(
    <FCCalc display={store.getState().buffer} />,
    document.getElementById("FCCalc")
  )
}

store.subscribe(watcher)
watcher()

