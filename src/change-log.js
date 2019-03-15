const EventEmitter = require('events')
const hypercore = require('hypercore')
const ram = require('random-access-memory')

class ChangeLog extends EventEmitter {

  constructor(key) {
    super()
    this.log = new hypercore(ram, key)

    this.log.on('ready', () => {
      this.emit('change_log.loaded', this.log.key.toString('hex'))
    })

    this.log.createReadStream({live: true})
      .on('data', (data) => {
        this.emit('change_log.changes_applied', JSON.parse(data))
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

module.exports = ChangeLog