import React from 'react'
import PropTypes from "prop-types";

const UserListItemComponent = ({user}) => (
  <li className="user-list-item">
    {user.displayName}
  </li>
)

UserListItemComponent.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string
  })
}

export default UserListItemComponent
