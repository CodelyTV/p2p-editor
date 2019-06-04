import React, { Component } from 'react'
import PropTypes from "prop-types";
import UserComponent from './UserListItemComponent';

class UserListComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: true
    }
  }

  render() {
    const { users } = this.props

    return (
      <div className={`user-list ${this.activeClassName()}`}>
        <span className="user-list__close-btn" onClick={() => {this.close()}}>-</span>
        <h2 className="user-list__title">Users</h2>
        <ul className="user-list__container">
          {users.map((user) => <UserComponent key={user.id} user={user}/>)}
        </ul>
      </div>
    )
  }

  close() {
    this.setState((state) => ({
      ...state,
      active: false
    }))
  }

  activeClassName() {
    return this.state.active ? 'user-list--active' : ''
  }
}

UserListComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string
  }))
}

export default UserListComponent
