import { EventEmitter } from 'events'
import webrtcSwarm from 'webrtc-swarm'
import  signalhub from 'signalhub'

class Session extends EventEmitter {

  constructor(sessionId, uuid) {
    super()
    this.sessionId = sessionId

    const hub = signalhub(this.sessionId, [
      process.env.SIGNALHUB_URL
    ])

    const sw = webrtcSwarm(hub, {uuid: uuid})

    sw.on('peer', (peer, peerId) => {
      this.emit('session.new_peer_appeared', peer, peerId)
    })

    sw.on('disconnect', (peer, peerId) => {
      this.emit('session.peer_disconnected', peer, peerId)
    })

    setImmediate(() => {
      this.emit('session.ready', this.sessionId)
    })
  }
}

export default Session