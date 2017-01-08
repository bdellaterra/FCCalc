import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from '../../css/FCCalc.css'

class FCCalc extends Component {
  render() {
    return <div>{this.props.value}</div>;
  }
}

export default FCCalc
