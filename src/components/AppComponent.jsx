import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HomePageComponent from './HomePageComponent';
import UserListComponent from './user-list/UserListComponent'

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
                <UserListComponent users={this.props.users}/>
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

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(AppComponent)
