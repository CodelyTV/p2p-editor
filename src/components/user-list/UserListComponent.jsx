import React from 'react'
import PropTypes from "prop-types";
import UserComponent from './UserListItemComponent';

const UserListComponent = ({users}) => (
  <div className="user-list">
    <h2 className="user-list__title">Users</h2>
    <ul className="user-list__container">
      {users.map((user) => <UserComponent key={user.id} user={user} />)}
    </ul>
  </div>
)

UserListComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string
  }))
}

export default UserListComponent
