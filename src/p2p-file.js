var events = require('events')
var inherits = require('inherits')
var hypercore = require('hypercore')
var ram = require('random-access-memory')

function P2PFile(key) {
  if (!(this instanceof P2PFile)) {
    return new P2PFile(key)
  }
  events.EventEmitter.call(this)

  var self = this
  var log = hypercore(ram, key)

  P2PFile.prototype.append = function(data) {
    log.append(JSON.stringify(data))
  } 

  P2PFile.prototype.replicate = function(peer, options) {
    var stream = log.replicate(options)
    peer.pipe(stream).pipe(peer)
  }

  log.on('ready', function() {
    self.emit('ready', log.key.toString('hex'))
  })

  log.createReadStream({live: true})
    .on('data', function (data) {
      self.emit('data', JSON.parse(data))
    })
}

inherits(P2PFile, events.EventEmitter)

module.exports = P2PFile