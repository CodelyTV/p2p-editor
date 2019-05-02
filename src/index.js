import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import AppComponent from './components/AppComponent'
import hypercore from 'hypercore'
import ram  from 'random-access-memory'
import Session from './session'
import sessionIdFromUrl from './session-id-from-url'
import Editor from './editor'
import ChangeLog from './change-log'
import Peer from './peer'
import PeerSet from './peer-set'
import { randomBytes } from 'crypto';

const store = createStore(
  rootReducer,
  {users: []},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class P2PEditor {

  constructor() {
    this.sessionId = sessionIdFromUrl(window.location.toString())
    this.isFollower = this.sessionId != null
    this.changeLog = new ChangeLog(this.sessionId)
    this.editor = new Editor(this.isFollower)
    this.session = null
    this.peers = new PeerSet()

    this.peers.on('added', (peer) => {
      store.dispatch({
        type: 'USER_CONNECTED',
        userId: peer.id
      })
      peer.subscribe((action) => {
        store.dispatch(action)
      })
    })

    ReactDOM.render(
      <Provider store={store}>
        <AppComponent sessionId={this.sessionId} isFollower={this.isFollower} />
      </Provider>,
      document.getElementById('app')
    )

    this.editor.on('editor.updated', (delta) => {
      this.changeLog.append(delta)
    })

    this.changeLog.on('change_log.loaded', (key) => {
      this.myLog = hypercore(ram, {valueEncoding: 'json'})

      this.myLog.on('ready', () => {

        this.myLog.append({
          type: 'SET_DISPLAY_NAME',
          userId: this.myLog.key.toString('hex'),
          displayName: randomBytes(10).toString('hex')
        })

        this.session = new Session(key, this.myLog.key.toString('hex'))

        this.session.on('session.ready', (sessionId) => {
          if (!this.isFollower) {
            window.history.pushState(null, null, sessionId)
          }
        })

        this.session.on('session.new_peer_appeared', (peer, peerId) => {

          var remoteLog = hypercore(ram, peerId, {valueEncoding: 'json'})
          remoteLog.on('ready', () => {
            var stream = this.changeLog.replicate(peer, {live: true, encrypt: false})
            this.myLog.replicate({stream: stream})
            remoteLog.replicate({stream: stream})
            peer.pipe(stream).pipe(peer)

            const user = new Peer(peerId, remoteLog)
            this.peers.add(user)
          })
        })

        this.session.on('session.peer_disconnected', (peer, peerId) => {
          this.peers.remove(peerId)
        })
      })
    })

    this.changeLog.on('change_log.changes_applied', (data) => {
      if (this.isFollower) {
        this.editor.applyDelta(data)
      }
    })
  }
}

new P2PEditor()
