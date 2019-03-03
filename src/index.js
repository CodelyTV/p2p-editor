var p2pEditor = require('./p2p-editor')
var sessionIdFromUrl = require('./session-id-from-url')

var sessionId = sessionIdFromUrl(window.location.toString())

var session = p2pEditor(sessionId)

session.on('ready', function(sessionId) {
  if (!session.follower) {
    window.history.pushState(null, null, sessionId)
  }
})

session.on('peer', function() {
  console.log('new peer')
})