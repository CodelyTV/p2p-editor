import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ace from 'ace-builds'
import editorLanguages from './editorLanguages'
import { selectEditorLanguage } from '../../actions'

class LanguageSelectorComponent extends Component {
  constructor(props) {
    super(props)
    this.aceEditor = ace.edit("editor")

    this.state = {
      languages: editorLanguages
    }
  }

  render() {
    return (
      this.props.enabled ?
        <select className="language-selector" onChange={(e) => {this.selectLanguage(e.target.value)}}>
          {this.state.languages.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
        </select> :
        <div className="selected-language">{this.selectedLanguageName()}</div>
    )
  }

  selectedLanguageName() {
    return this.state.languages.filter(l => l.id === this.props.selectedLanguageId)[0].name
  }

  selectLanguage(languageId) {
    this.props.selectedEditorLanguage(languageId)
  }

  setAceEditorMode(languageId) {
    this.aceEditor.session.setMode(`ace/mode/${languageId}`)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedLanguageId !== prevProps.selectedLanguageId) {
      this.setAceEditorMode(this.props.selectedLanguageId)
    }
  }

}

LanguageSelectorComponent.propTypes = {
  enabled: PropTypes.bool.isRequired,
  selectedLanguageId: PropTypes.string.isRequired,
  selectedEditorLanguage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    selectedLanguageId: state.editorLanguageId,
    enabled: !state.isFollower
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedEditorLanguage: (languageId) => {
      dispatch(selectEditorLanguage(languageId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelectorComponent)
