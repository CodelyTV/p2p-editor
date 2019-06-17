import React, { Component } from 'react'
import editorLanguages from './editorLanguages'

class LanguageSelectorComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      languages: editorLanguages
    }
  }

  render() {
    return (
      <select>
        {this.state.languages.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
      </select>
    )
  }
}

export default LanguageSelectorComponent
