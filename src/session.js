const EventEmitter = require('events')
const webrtcSwarm = require('webrtc-swarm')
const signalhub = require('signalhub')

class Session extends EventEmitter {

  constructor(sessionId) {
    super()
    this.sessionId = sessionId

    const hub = signalhub(this.sessionId, [
      process.env.SIGNALHUB_URL
    ])

    const sw = webrtcSwarm(hub)

    sw.on('peer', (peer) => {
      this.emit('session.new_peer_appeared', peer)
    })

    setImmediate(() => {
      this.emit('session.ready', this.sessionId)
    })
  }
}

module.exports = Session