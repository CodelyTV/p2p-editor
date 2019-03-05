const EventEmitter = require('events')
const ace = require('ace-builds')
require('ace-builds/webpack-resolver')

class Editor extends EventEmitter {

  constructor(readonly) {
    super()

    this.aceEditor = ace.edit("editor")
    this.aceEditor.setTheme("ace/theme/monokai")
    this.aceEditor.session.setMode("ace/mode/javascript")
    this.aceEditor.setReadOnly(readonly)

    this.aceEditor.on('change', (delta) => {
      this.emit('change', delta)
    })
  }

  applyDelta(delta) {
    this.aceEditor.getSession().getDocument().applyDeltas([delta])
    this.aceEditor.gotoLine(delta.end.row + 1, delta.end.column, true)
  }
}

module.exports = Editor