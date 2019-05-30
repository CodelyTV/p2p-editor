import React, { Component } from 'react'
import PropTypes from 'prop-types'

class JoinSessionComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      displayName: ''
    }
  }

  render() {
    const { sessionId } = this.props

    return (
      <form className="join-session" onSubmit={(e) => this.onJoinSessionSubmit(e) }>
        <p className="join-session__description">
          You are joining the session<br/>
          <span className="join-session__session-id">{sessionId}</span>
        </p>
        <input
          className="join-session__display-name"
          type="text"
          placeholder="Display name"
          required
          onKeyUp={(e) => this.onDisplayNameChanged(e)}
        />
        <button className="join-session__button">Join session</button>
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

  onJoinSessionSubmit(e) {
    e.preventDefault();

    if (this.state.displayName === '') {
      return;
    }

    this.props.onJoinSession(this.state.displayName)
  }
}

JoinSessionComponent.propTypes = {
  sessionId: PropTypes.string,
  onJoinSession: PropTypes.func.isRequired
}

export default JoinSessionComponent
