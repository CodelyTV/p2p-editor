import { EventEmitter } from 'events'
import ChangeLog from "./change-log";
import hypercore from "hypercore";
import ram from "random-access-memory";
import PeerSet from "./peer-set";
import Session from "./session";
import Peer from "./peer";

class ReactiveSwarm extends EventEmitter {
  constructor(sessionId, isFollower) {
    super()
    this.changeLog = new ChangeLog(sessionId)
    this.session = null
    this.peers = new PeerSet()

    this.changeLog.on('change_log.loaded', (key) => {
      this.myLog = hypercore(ram, {valueEncoding: 'json'})

      this.myLog.on('ready', () => {
        const myKey = this.myLog.key.toString('hex')

        this.session = new Session(key, myKey, isFollower)

        this.session.on('session.new_peer_appeared', (peer, peerId) => {

          let remoteLog = hypercore(ram, peerId, {valueEncoding: 'json'})
          remoteLog.on('ready', () => {
            let stream = this.changeLog.replicate(peer, {live: true, encrypt: false})
            this.myLog.replicate({stream: stream, live: true, encrypt: false})
            remoteLog.replicate({stream: stream, live: true, encrypt: false})
            peer.pipe(stream).pipe(peer)

            const user = new Peer(peerId, remoteLog)
            this.peers.add(user)
            this.emit('peer_connected', user)
          })
        })

        this.session.on('session.peer_disconnected', (peer, peerId) => {
          this.peers.remove(peerId)
          this.emit('peer_disconnected', peer, peerId)
        })

        this.emit('ready', key, myKey)
      })
    })
  }
}

export default ReactiveSwarm
