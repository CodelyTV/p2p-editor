var hypercore = require('hypercore')
var ram = require('random-access-memory')
var webrtcSwarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var ace = require('ace-builds')
require('ace-builds/webpack-resolver')
var sessionIdFromUrl = require('./session-id-from-url')

var key = sessionIdFromUrl(window.location.toString())

var log = hypercore(ram, key)

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
if (key != null) {
  editor.setReadOnly(true)
}

editor.on('change', (delta) => {
  log.append(JSON.stringify(delta))
})

log.on('ready', function() {
  if (key == null) {
    window.history.pushState(null, null, log.key.toString('hex'))
  }

  var hub = signalhub(log.key.toString('hex'), [
    'http://localhost:8080'
  ])

  var sw = webrtcSwarm(hub)

  sw.on('peer', function(peer) {
    console.log('new peer')
    var stream = log.replicate({live: true, encrypt: false})
    peer.pipe(stream).pipe(peer)
  })
})

log.createReadStream({live: true})
  .on('data', function (data) {
    if (key != null) {
      var delta = JSON.parse(data);
      editor.getSession().getDocument().applyDeltas([delta]);
      editor.gotoLine(delta.end.row + 1, delta.end.column, true)
    }
  })
