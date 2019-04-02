import { EventEmitter } from 'events'
import webrtcSwarm from 'webrtc-swarm'
import  signalhub from 'signalhub'

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

export default Session