var events = require('events')
var inherits = require('inherits')
var webrtcSwarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var editor = require('./editor')
var p2pFile = require('./p2p-file')

function P2PEditor(sessionId) {
  if (!(this instanceof P2PEditor)) {
    return new P2PEditor(sessionId)
  }
  events.EventEmitter.call(this)

  var self = this
  this.sessionId = sessionId
  this.follower = this.sessionId != null
  this.file = p2pFile(this.sessionId);
  this.editor = editor(this.follower)
  
  this.editor.on('change', (delta) => {
    self.file.append(delta)
  })

  this.file.on('ready', function(key) {
    self.sessionId = key

    var hub = signalhub(self.sessionId, [
      process.env.SIGNALHUB_URL
    ])

    var sw = webrtcSwarm(hub)

    sw.on('peer', function(peer) {
      self.file.replicate(peer, {live: true, encrypt: false})
      self.emit('peer', peer)
    })

    self.emit('ready', self.sessionId)
  })

  this.file.on('data', function (data) {
    if (self.follower) {
      self.editor.applyDelta(data)
    }
  })
}

inherits(P2PEditor, events.EventEmitter)

module.exports = P2PEditor