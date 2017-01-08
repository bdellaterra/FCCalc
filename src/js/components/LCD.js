import React, { Component } from 'react'

export default class LCD extends Component {
  render() {
    return (
      <div className="lcd">{this.props.value}</div>
    )
  }
}

// Key.propTypes = {
//   id: React.PropTypes.string,
//   children: React.PropTypes.node
// }
