var events = require('events')
var inherits = require('inherits')
var ace = require('ace-builds')
require('ace-builds/webpack-resolver')

function Editor(readonly) {
  if (!(this instanceof Editor)) {
    return new Editor(readonly);
  }
  events.EventEmitter.call(this)

  var self = this
  var aceEditor = ace.edit("editor")
  aceEditor.setTheme("ace/theme/monokai")
  aceEditor.session.setMode("ace/mode/javascript")
  aceEditor.setReadOnly(readonly)

  aceEditor.on('change', (delta) => {
    self.emit('change', delta)
  })

  Editor.prototype.applyDelta = function(delta) {
    aceEditor.getSession().getDocument().applyDeltas([delta]);
    aceEditor.gotoLine(delta.end.row + 1, delta.end.column, true)
  }
}

inherits(Editor, events.EventEmitter)

module.exports = Editor