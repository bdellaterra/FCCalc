import React, { Component } from 'react'

const Col = ({children}) => (
  <div className="column">{children}</div>
)

Col.propTypes = {
  children: React.PropTypes.node
}

export default Col
