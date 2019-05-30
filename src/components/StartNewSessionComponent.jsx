import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StartNewSessionComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: ''
    }
  }

  render() {
    return (
      <div className="start-new-session">
        <input className="start-new-session__display-name" type="text" placeholder="Display name" onKeyUp={(e) => this.onDisplayNameChanged(e)} />
        <button className="start-new-session__button" onClick={() => this.onStartSessionClicked() }>Start new session</button>
      </div>
    )
  }

  onDisplayNameChanged(e) {
    const displayName = e.target.value

    this.setState((prevState) => ({
      ...prevState,
      displayName
    }))
  }

  onStartSessionClicked() {
    if (this.state.displayName === '') {
      return;
    }

    this.props.onStartSession(this.state.displayName)
  }
}

StartNewSessionComponent.propTypes = {
  onStartSession: PropTypes.func.isRequired
}

export default StartNewSessionComponent
