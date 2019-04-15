import React from 'react'
import ReactDOM from 'react-dom'
import AppComponent from './components/AppComponent'
import hypercore from 'hypercore'
import ram  from 'random-access-memory'
import Session from './session'
import sessionIdFromUrl from './session-id-from-url'
import Editor from './editor'
import ChangeLog from './change-log'
import PeerSet from './peer-set'
import PeerListComponent from './peer-list-component'


class P2PEditor {

  constructor() {
    this.sessionId = sessionIdFromUrl(window.location.toString())
    this.isFollower = this.sessionId != null
    this.changeLog = new ChangeLog(this.sessionId)
    this.editor = new Editor(this.isFollower)
    this.session = null
    this.peers = new PeerSet()
    new PeerListComponent(this.peers)

    ReactDOM.render(<AppComponent sessionId={this.sessionId} isFollower={this.isFollower} />, document.getElementById('app'))

    this.editor.on('editor.updated', (delta) => {
      this.changeLog.append(delta)
    })

    this.changeLog.on('change_log.loaded', (key) => {
      this.myLog = hypercore(ram)

      this.myLog.on('ready', () => {

        this.session = new Session(key, this.myLog.key.toString('hex'))

        this.session.on('session.ready', (sessionId) => {
          if (!this.isFollower) {
            window.history.pushState(null, null, sessionId)
          }
        })

        this.session.on('session.new_peer_appeared', (peer, peerId) => {
          this.peers.add(peerId)

          var remoteLog = hypercore(ram, peerId)
          remoteLog.on('ready', () => {
            var stream = this.changeLog.replicate(peer, {live: true, encrypt: false})
            this.myLog.replicate({stream: stream})
            remoteLog.replicate({stream: stream})
            peer.pipe(stream).pipe(peer)
          })

          remoteLog.createReadStream({live: true})
            .on('data', (data) => {
              // eslint-disable-next-line no-console
              console.log(data.toString())
            })
        })

        this.session.on('session.peer_disconnected', (peer, peerId) => {
          this.peers.remove(peerId)
        })
      })
    })
<<<<<<< HEAD

    this.peers.on('added', (peer) => {
      console.log(`connected ${peer}`)
    })

    this.peers.on('removed', (peer) => {
      console.log(`disconnected ${peer}`)
    })

=======

>>>>>>> show hypercore id of connected peer
    this.changeLog.on('change_log.changes_applied', (data) => {
      if (this.isFollower) {
        this.editor.applyDelta(data)
      }
    })
  }
}

new P2PEditor()
