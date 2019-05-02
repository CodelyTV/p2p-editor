import React from 'react'

const UserListItemComponent = ({user}) => (
  <li className="user-list-item">
    {user.displayName}
  </li>
)

export default UserListItemComponent
