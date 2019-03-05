const EventEmitter = require('events')
const webrtcSwarm = require('webrtc-swarm')
const signalhub = require('signalhub')
const Editor = require('./editor')
const P2PFile = require('./p2p-file')

class P2PEditor extends EventEmitter {

  constructor(sessionId) {
    super()
    this.sessionId = sessionId
    this.follower = this.sessionId != null
    this.file = new P2PFile(this.sessionId)
    this.editor = new Editor(this.follower)

    this.editor.on('change', (delta) => {
      this.file.append(delta)
    })
  
    this.file.on('ready', (key) => {
      this.sessionId = key
  
      const hub = signalhub(this.sessionId, [
        process.env.SIGNALHUB_URL
      ])
  
      const sw = webrtcSwarm(hub)
  
      sw.on('peer', (peer) => {
        this.file.replicate(peer, {live: true, encrypt: false})
        this.emit('peer', peer)
      })
  
      this.emit('ready', this.sessionId)
    })
  
    this.file.on('data', (data) => {
      if (this.follower) {
        this.editor.applyDelta(data)
      }
    })
  }
}

module.exports = P2PEditor