import React, { Component } from 'react'

import Key from './Key.js'
import Set from './Set.js'

const Operators = () => (
  <div className="operators">
    <Set>
      <Key code="/">&divide;</Key>
      <Key code="*">&times;</Key>
      <Key code="+" id="plus">+</Key>
    </Set>
    <Set>
      <Key code="A" id="allclear">AC</Key>
      <Key code="C" id="clear">C</Key>
      <Key code="-">-</Key>
      <Key code="=" id="equals">=</Key>
    </Set>
  </div>
)

export default Operators
