import React, { Component } from 'react'

class LCD extends Component {
  render() {
    return (
      <div className="lcd">{this.props.display}</div>
    )
  }
}

LCD.propTypes = {
  display: React.PropTypes.string,
  children: React.PropTypes.node
}

export default LCD
