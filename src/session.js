const EventEmitter = require('events')
const webrtcSwarm = require('webrtc-swarm')
const signalhub = require('signalhub')

class Session extends EventEmitter {

  constructor(sessionId, isFollower) {
    super()

    const self = this;

    async function init() {
      self.sessionId = sessionId

      let options = {}
      
      if (!isFollower) {
        const constraints = {audio: false, video: true}
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        const video = document.querySelector('video');
        video.srcObject = stream;
        options = {
          stream: stream,
          offerConstraints: { 
            mandatory: { 
                OfferToReceiveAudio: true, 
                OfferToReceiveVideo: true 
            } 
        }
        }
      }


      const hub = signalhub(self.sessionId, [
        process.env.SIGNALHUB_URL
      ])

      const sw = webrtcSwarm(hub, options)

      sw.on('peer', (peer) => {
        console.log(peer)
        peer.on('stream', (stream) => {
          console.log('stream')
          const video = document.querySelector('video');
          video.srcObject = stream;
        })

        self.emit('session.new_peer_appeared', peer)
      })

      setImmediate(() => {
        self.emit('session.ready', self.sessionId)
      })
    }

    init()
  }
}

module.exports = Session