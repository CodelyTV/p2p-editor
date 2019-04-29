import React from 'react'
import PropTypes from 'prop-types'

const PageComponent = ({children}) => (
  <section className="page">
    <div className="page__container">
      {children}
    </div>
  </section>
)

PageComponent.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageComponent
