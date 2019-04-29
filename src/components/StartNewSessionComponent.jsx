import React from 'react'
import PropTypes from 'prop-types'

const StartNewSessionComponent = ({onStartSession}) => (
  <div className="start-new-session">
      <button className="start-new-session__button" onClick={onStartSession}>Start new session</button>
  </div>
)

StartNewSessionComponent.propTypes = {
  onStartSession: PropTypes.func.isRequired
}

export default StartNewSessionComponent
