import React, { Component } from 'react'
import ace from 'ace-builds'
import editorLanguages from './editorLanguages'

class LanguageSelectorComponent extends Component {
  constructor(props) {
    super(props)
    this.aceEditor = ace.edit("editor")

    this.state = {
      selectedLanguage: 'javascript',
      languages: editorLanguages
    }
  }

  render() {
    return (
      <select onChange={(e) => {this.selectLanguage(e.target.value)}}>
        {this.state.languages.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
      </select>
    )
  }

  selectLanguage(languageId) {
    this.aceEditor.session.setMode(`ace/mode/${languageId}`)
  }
}

export default LanguageSelectorComponent
