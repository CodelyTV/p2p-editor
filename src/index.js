const Session = require('./session')
const sessionIdFromUrl = require('./session-id-from-url')
const Editor = require('./editor')
const ChangeLog = require('./change-log')

class P2PEditor {

  constructor() {
    this.sessionId = sessionIdFromUrl(window.location.toString())
    this.isFollower = this.sessionId != null
    this.changeLog = new ChangeLog(this.sessionId)
    this.editor = new Editor(this.isFollower)
    this.session = null

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
        this.changeLog.replicate(peer, {live: true, encrypt: false})
        // eslint-disable-next-line no-console
        console.log('new peer')
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