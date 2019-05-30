import React from 'react'
import PropTypes from "prop-types";
import UserComponent from './UserListItemComponent';

const UserListComponent = ({users}) => (
  <ul className="user-list">
    {users.map((user) => <UserComponent key={user.id} user={user} />)}
  </ul>
)

UserListComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string
  }))
}

export default UserListComponent
