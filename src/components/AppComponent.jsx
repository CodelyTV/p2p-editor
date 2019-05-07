import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HomePageComponent from './HomePageComponent';
import UserListComponent from './user-list/UserListComponent'
import { setDisplayName, startSession } from '../actions'

class AppComponent extends Component {

  constructor(props) {
    super(props)
    this.startSession = this.startSession.bind(this);
  }

  render() {
    const {sessionId, isFollower, isSessionStarted} = this.props

    return (
      <div>
        {!isSessionStarted &&
        <HomePageComponent
          userId={this.props.userId}
          sessionId={sessionId}
          isFollower={isFollower}
          onStartSession={(displayName) => this.startSession(displayName)}
        />
        }
        <UserListComponent users={this.props.users}/>
      </div>
    )
  }

  startSession(displayName) {
    this.props.onStartSession(this.props.userId, displayName)
  }
}

AppComponent.propTypes = {
  userId: PropTypes.string,
  sessionId: PropTypes.string,
  isSessionStarted: PropTypes.bool,
  isFollower: PropTypes.bool,
  onStartSession: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    sessionId: state.sessionId,
    isSessionStarted: state.isSessionStarted,
    isFollower: state.isFollower,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartSession: (userId, displayName) => {
      dispatch(startSession())
      dispatch(setDisplayName(userId, displayName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
