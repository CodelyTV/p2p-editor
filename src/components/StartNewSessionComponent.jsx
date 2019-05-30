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
      <form className="start-new-session" onSubmit={(e) => this.onStartSessionSubmit(e) }>
        <input
          className="start-new-session__display-name"
          type="text"
          placeholder="Display name"
          required
          onKeyUp={(e) => this.onDisplayNameChanged(e)}
        />
        <button className="start-new-session__button">Start new session</button>
      </form>
    )
  }

  onDisplayNameChanged(e) {
    const displayName = e.target.value

    this.setState((prevState) => ({
      ...prevState,
      displayName
    }))
  }

  onStartSessionSubmit(e) {
    e.preventDefault();

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
