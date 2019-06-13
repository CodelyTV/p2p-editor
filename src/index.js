import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import AppComponent from './components/AppComponent'
import sessionIdFromUrl from './session-id-from-url'
import Editor from './editor'
import {initializeSession, userConnected, userDisconnected} from './actions'
import notifyPeers from "./middlewares/notifyPeers";
import ReactiveSwarm from "./reactive-swarm";

class P2PEditor {

  constructor() {
    this.sessionId = sessionIdFromUrl(window.location.toString())
    this.isFollower = this.sessionId != null
    this.reactiveSwarm = new ReactiveSwarm(this.sessionId, this.isFollower)
    this.editor = new Editor(this.isFollower)
    this.store = null

    this.editor.on('editor.updated', (delta) => {
      this.reactiveSwarm.changeLog.append(delta)
    })

    this.reactiveSwarm.on('ready', (key, myKey) => {

      this.initializeSession(key, myKey)

      this.reactiveSwarm.on('peer_connected', (peer) => {
        this.store.dispatch(userConnected(peer.id))
        peer.subscribe((action) => {
          this.store.dispatch(action)
        })
      })

      this.reactiveSwarm.on('peer_disconnected', (peer, peerId) => {
        this.store.dispatch(userDisconnected(peerId));
      })

      this.reactiveSwarm.changeLog.on('change_log.changes_applied', (data) => {
        if (this.isFollower) {
          this.editor.applyDelta(data)
        }
      })
    })
  }

  initializeSession(key, myKey) {
    this.sessionId = key;

    if (!this.isFollower) {
      this.addSessionIdToUrl()
    }

    this.store = createStore(
      rootReducer,
      {users: []},
      composeWithDevTools(
        applyMiddleware(notifyPeers(this.reactiveSwarm.myLog))
      )
    )

    this.store.dispatch(initializeSession(myKey, key, this.isFollower))
    this.store.dispatch(userConnected(myKey))

    ReactDOM.render(
      <Provider store={this.store}>
        <AppComponent sessionId={this.sessionId} isFollower={this.isFollower} />
      </Provider>,
      document.getElementById('app')
    )
  }

  addSessionIdToUrl() {
    window.history.pushState(null, null, this.sessionId)
  }
}

new P2PEditor()
