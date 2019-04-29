import React from 'react'
import PropTypes from 'prop-types'

const JoinSessionComponent = ({sessionId, onJoinSession}) => (
  <div className="join-session">
      <p className="join-session__description">
          You are joining the session<br/>
          <span className="join-session__session-id">{sessionId}</span>
      </p>
      <button className="join-session__button" onClick={onJoinSession}>Join session</button>
  </div>
)

JoinSessionComponent.propTypes = {
  sessionId: PropTypes.string,
  onJoinSession: PropTypes.func.isRequired
}

export default JoinSessionComponent
