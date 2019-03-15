const P2PEditor = require('./p2p-editor')
const sessionIdFromUrl = require('./session-id-from-url')

const sessionId = sessionIdFromUrl(window.location.toString())

const p2pEditor = new P2PEditor(sessionId)

p2pEditor.on('ready', (sessionId) => {
  if (!p2pEditor.isFollower) {
    window.history.pushState(null, null, sessionId)
  }
})

p2pEditor.on('session.new_peer_appeared', () => {
  console.log('new peer')
})