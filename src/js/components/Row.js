import React, { Component } from 'react'

const Row = ({children}) => (
  <div className="row">{children}</div>
)

Row.propTypes = {
  children: React.PropTypes.node
}

export default Row
