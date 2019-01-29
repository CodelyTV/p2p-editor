var hypercore = require('hypercore')
var ram = require('random-access-memory')
var webrtcSwarm = require('webrtc-swarm')
var signalhub = require('signalhub')

var key = window.location.toString().split('#')[1]

var log = hypercore(ram, key)

var div = document.createElement('div')
var $ = document.querySelector.bind(document)

div.innerHTML = `
  <textarea></textarea>
  <button>tweet</button>
  <div id="timeline"></div>
`

document.body.appendChild(div)

$('button').onclick = function () {
  var val = $('textarea').value
  log.append(val)
}

log.on('ready', function() {
  console.log(log.key.toString('hex'))
  var hub = signalhub(log.key.toString('hex'), [
    'http://localhost:8080'
  ])

  var sw = webrtcSwarm(hub)

  sw.on('peer', function(peer) {
    console.log('new peer')
    var stream = log.replicate({live: true, encrypt: false})
    peer.pipe(stream).pipe(peer)
  })
})

log.createReadStream({live: true})
  .on('data', function (data) {
    var div = document.createElement('div')
    div.innerHTML = data.toString()
    $('#timeline').appendChild(div)
  })
