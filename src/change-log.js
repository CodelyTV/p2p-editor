import { EventEmitter } from 'events'
import hypercore from 'hypercore'
import ram from 'random-access-memory'

class ChangeLog extends EventEmitter {

  constructor(key) {
    super()
    this.log = new hypercore(ram, key, {valueEncoding: 'json'})

    this.log.on('ready', () => {
      this.emit('change_log.loaded', this.log.key.toString('hex'))
    })

    this.log.createReadStream({live: true})
      .on('data', (data) => {
        this.emit('change_log.changes_applied', data)
      })
  }

  append(data) {
    this.log.append(data)
  } 

  replicate(peer, options) {
    const stream = this.log.replicate(options)
    peer.pipe(stream).pipe(peer)
  }
}

export default ChangeLog