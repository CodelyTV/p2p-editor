import React from 'react'
import UserComponent from './UserListItemComponent';

const UserListComponent = ({users}) => (
  <ul className="user-list">
    {users.map((user) => <UserComponent key={user.id} user={user} />)}
  </ul>
)

export default UserListComponent
