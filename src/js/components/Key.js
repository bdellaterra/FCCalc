import React, { Component } from 'react'

import store from '../store'
import { input, operator, clear, allclear } from '../reducers'


class Key extends Component {

  handleClick = () => {
    switch(this.props.code) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.': {
        store.dispatch(input(this.props.code))
        break
      }
      // TODO: Impliment sign key
      // case '!': {
      //   store.dispatch(sign())
      //   break
      // }
      case '+':
      case '-':
      case '*':
      case '/':
      case '=': {
        store.dispatch(operator(this.props.code))
        break
      }
      case 'C': {
        store.dispatch(clear())
        break
      }
      case 'A': {
        store.dispatch(allclear())
        break
      }
    }
  }

  render() {
    return (
      <div id={this.props.id} className="slot">
        <div className="key" onClick={this.handleClick}>{this.props.children}</div>
      </div>
    )
  }

}


Key.propTypes = {
  code: React.PropTypes.string,
  children: React.PropTypes.node
}

export default Key
