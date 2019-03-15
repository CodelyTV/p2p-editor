const EventEmitter = require('events')
const webrtcSwarm = require('webrtc-swarm')
const signalhub = require('signalhub')
const Editor = require('./editor')
const ChangeLog = require('./change-log')

class P2PEditor extends EventEmitter {

  constructor(sessionId) {
    super()
    this.sessionId = sessionId
    this.isFollower = this.sessionId != null
    this.changeLog = new ChangeLog(this.sessionId)
    this.editor = new Editor(this.isFollower)

    this.editor.on('editor.updated', (delta) => {
      this.changeLog.append(delta)
    })
  
    this.changeLog.on('change_log.loaded', (key) => {
      this.sessionId = key
  
      const hub = signalhub(this.sessionId, [
        process.env.SIGNALHUB_URL
      ])
  
      const sw = webrtcSwarm(hub)
  
      sw.on('peer', (peer) => {
        this.changeLog.replicate(peer, {live: true, encrypt: false})
        this.emit('session.new_peer_appeared', peer)
      })
  
      this.emit('ready', this.sessionId)
    })
  
    this.changeLog.on('change_log.changes_applied', (data) => {
      if (this.isFollower) {
        this.editor.applyDelta(data)
      }
    })
  }
}

module.exports = P2PEditor