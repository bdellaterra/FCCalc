import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from '../../css/FCCalc.css'
import Col from './Col.js'
import LCD from './LCD.js'
import Numbers from './Numbers.js'
import Operators from './Operators.js'
import Row from './Row.js'

class FCCalc extends Component {
  render() {
    return (
      <div className="calculator">
        <Row>
          <LCD value={this.props.value} />
        </Row>
        <Row>
          <Col>
            <Numbers />
          </Col>
          <Col>
            <Operators />
          </Col>
        </Row>
      </div>
    )
  }
}

export default FCCalc
