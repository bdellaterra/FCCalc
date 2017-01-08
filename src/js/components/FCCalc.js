import React, { Component } from 'react'

import Col from './Col'
import LCD from './LCD'
import Numbers from './Numbers'
import Operators from './Operators'
import Row from './Row'

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
