import React, { Component } from 'react'

const Set = ({children}) => (
  <div className="set">{children}</div>
)

Set.propTypes = {
  children: React.PropTypes.node
}

export default Set
