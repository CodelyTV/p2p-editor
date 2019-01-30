var hypercore = require('hypercore')
var ram = require('random-access-memory')
var webrtcSwarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var key = window.location.toString().split('#')[1]

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
  console.log(log.key.toString('hex'))
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
      editor.getSession().getDocument().applyDeltas([JSON.parse(data)]);
    }
  })
