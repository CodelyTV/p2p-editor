const P2PEditor = require('./p2p-editor')
const sessionIdFromUrl = require('./session-id-from-url')

const sessionId = sessionIdFromUrl(window.location.toString())

const session = new P2PEditor(sessionId)

session.on('ready', (sessionId) => {
  if (!session.follower) {
    window.history.pushState(null, null, sessionId)
  }
})

session.on('peer', () => {
  console.log('new peer')
})