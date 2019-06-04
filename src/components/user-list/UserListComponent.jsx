import React from 'react'
import PropTypes from "prop-types";
import UserComponent from './UserListItemComponent';

const UserListComponent = ({ users, active, onCloseClicked}) => (
  <div className={'user-list' + (active ? ' user-list--active' : '')}>
    <span className="user-list__close-btn" onClick={() => {onCloseClicked()}}>-</span>
    <h2 className="user-list__title">Users ({users.length})</h2>
    <ul className="user-list__container">
      {users.map((user) => <UserComponent key={user.id} user={user}/>)}
    </ul>
  </div>
)


UserListComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string
  })),
  active: PropTypes.bool.isRequired,
  onCloseClicked: PropTypes.func.isRequired
}

export default UserListComponent
