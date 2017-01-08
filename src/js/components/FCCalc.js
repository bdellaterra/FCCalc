import React, { Component } from 'react'

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
          <LCD display={this.props.display} />
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

FCCalc.propTypes = {
  display: React.PropTypes.string,
  children: React.PropTypes.node
}

export default FCCalc
