import React from 'react'
import ReactDOM from 'react-dom'
import AppComponent from './components/AppComponent'
import Session from './session'
import sessionIdFromUrl from './session-id-from-url'
import Editor from './editor'
import ChangeLog from './change-log'
import PeerSet from './peer-set'


class P2PEditor {

  constructor() {
    this.sessionId = sessionIdFromUrl(window.location.toString())
    this.isFollower = this.sessionId != null
    this.changeLog = new ChangeLog(this.sessionId)
    this.editor = new Editor(this.isFollower)
    this.session = null
    this.peers = new PeerSet()

    ReactDOM.render(<AppComponent sessionId={this.sessionId} isFollower={this.isFollower} />, document.getElementById('app'))

    this.editor.on('editor.updated', (delta) => {
      this.changeLog.append(delta)
    })

    this.changeLog.on('change_log.loaded', (key) => {
      this.session = new Session(key)

      this.session.on('session.ready', (sessionId) => {
        if (!this.isFollower) {
          window.history.pushState(null, null, sessionId)
        }
      })

      this.session.on('session.new_peer_appeared', (peer) => {
        this.peers.add(peer)
        this.changeLog.replicate(peer, {live: true, encrypt: false})
      })

      this.session.on('session.peer_disconnected', (peer) => {
        this.peers.remove(peer)
      })
    })

    this.peers.on('added', (peer) => {
      console.log(`connected ${peer}`)
    })
    
    this.peers.on('removed', (peer) => {
      console.log(`disconnected ${peer}`)
    })

    this.changeLog.on('change_log.changes_applied', (data) => {
      if (this.isFollower) {
        this.editor.applyDelta(data)
      }
    })
  }
}

new P2PEditor()
