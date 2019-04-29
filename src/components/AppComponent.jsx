import React, {Component} from 'react'
import PropTypes from 'prop-types'
import HomePageComponent from './HomePageComponent';

class AppComponent extends Component {

    constructor(props) {
        super(props)

        this.startSession = this.startSession.bind(this);

        this.state = {
            sessionId: props.sessionId,
            isFollower: props.isFollower,
            isSessionStarted: false
        }
    }

    render() {
        const {sessionId, isFollower, isSessionStarted} = this.state

        return (
            <div>
                {!isSessionStarted &&
                  <HomePageComponent
                      sessionId={sessionId}
                      isFollower={isFollower}
                      onStartSession={this.startSession}
                  />
                }
            </div>
        )
    }

    startSession() {
      this.setState(state => ({
          state,
          isSessionStarted: true
      }))
    }
}

AppComponent.propTypes = {
  sessionId: PropTypes.string,
  isFollower: PropTypes.bool.isRequired,
}

export default AppComponent
