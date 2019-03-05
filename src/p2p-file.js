const EventEmitter = require('events')
const hypercore = require('hypercore')
const ram = require('random-access-memory')

class P2PFile extends EventEmitter {

  constructor(key) {
    super()
    this.log = new hypercore(ram, key)

    this.log.on('ready', () => {
      this.emit('ready', this.log.key.toString('hex'))
    })

    this.log.createReadStream({live: true})
      .on('data', (data) => {
        this.emit('data', JSON.parse(data))
      })
  }

  append(data) {
    this.log.append(JSON.stringify(data))
  } 

  replicate(peer, options) {
    const stream = this.log.replicate(options)
    peer.pipe(stream).pipe(peer)
  }
}

module.exports = P2PFile