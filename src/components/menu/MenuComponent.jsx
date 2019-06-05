import React from 'react'
import PropTypes from 'prop-types'

const MenuComponent = ({children}) => (
  <div className="menu">
    {children}
  </div>
)

MenuComponent.propTypes = {
  children: PropTypes.node.isRequired
}

export default MenuComponent
