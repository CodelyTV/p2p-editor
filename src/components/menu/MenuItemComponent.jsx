import React from 'react'
import PropTypes from 'prop-types'

const MenuItemComponent = ({label, onItemClicked}) => (
  <div
    className="menu__item"
    onClick={onItemClicked}
  >
    {label}
  </div>
)

MenuItemComponent.propTypes = {
  label: PropTypes.string.isRequired,
  onItemClicked: PropTypes.func.isRequired
}

export default MenuItemComponent
