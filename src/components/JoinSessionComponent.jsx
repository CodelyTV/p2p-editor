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
    const { sessionId, onJoinSession } = this.props

    return (
      <div className="join-session">
        <p className="join-session__description">
          You are joining the session<br/>
          <span className="join-session__session-id">{sessionId}</span>
        </p>
        <input type="text" placeholder="Display name" onKeyUp={(e) => this.onDisplayNameChanged(e)} />
        <button className="join-session__button" onClick={() => onJoinSession(this.state.displayName)}>Join session</button>
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
}

JoinSessionComponent.propTypes = {
  sessionId: PropTypes.string,
  onJoinSession: PropTypes.func.isRequired
}

export default JoinSessionComponent
