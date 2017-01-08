import React, { Component } from 'react'

import Key from './Key'
import Set from './Set'

const Numbers = () => (
  <div className="numbers">
    <Set>
      <Key code="7">7</Key>
      <Key code="8">8</Key>
      <Key code="9">9</Key>
    </Set>
    <Set>
      <Key code="4">4</Key>
      <Key code="5">5</Key>
      <Key code="6">6</Key>
    </Set>
    <Set>
      <Key code="1">1</Key>
      <Key code="2">2</Key>
      <Key code="3">3</Key>
    </Set>
    <Set>
      {/* TODO: <Key code="!" id="sign">-</Key> */}
      <Key code="0" id="zero">0</Key>
      <Key code="." id="decimal">.</Key>
    </Set>
  </div>
)

export default Numbers
