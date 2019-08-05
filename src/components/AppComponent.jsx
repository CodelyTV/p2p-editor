import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HomePageComponent from './HomePageComponent';
import UserListComponent from './user-list/UserListComponent'
import { setDisplayName, startSession } from '../actions'
import MenuComponent from "./menu/MenuComponent";
import MenuItemComponent from "./menu/MenuItemComponent";
import StatusBarComponent from "./status-bar/StatusBarComponent";

class AppComponent extends Component {

  constructor(props) {
    super(props)
    this.startSession = this.startSession.bind(this);

    this.state = {
      userPanelActive: true
    }
  }

  render() {
    const {sessionId, isFollower, isSessionStarted} = this.props
    const {userPanelActive} = this.state

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
        <MenuComponent>
          <MenuItemComponent
            label={`Users (${this.props.users.length})`}
            onItemClicked={() => this.openUserPanel()}
          />
        </MenuComponent>
        <UserListComponent
          users={this.props.users}
          active={userPanelActive}
          onCloseClicked={() => {this.closeUserPanel()}}
        />
        <StatusBarComponent/>
      </div>
    )
  }

  startSession(displayName) {
    this.props.onStartSession(this.props.userId, displayName)
  }

  openUserPanel() {
    this.setState((state) => ({
      ...state,
      userPanelActive: true
    }))
  }

  closeUserPanel() {
    this.setState((state) => ({
      ...state,
      userPanelActive: false
    }))
  }
}

AppComponent.propTypes = {
  userId: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string
  })),
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
