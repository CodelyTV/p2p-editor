const hypercore = require('hypercore')
const ram = require('random-access-memory')

const feed = hypercore(function (filename) {
  return ram()
})

feed.on('ready', () => {
    console.log(feed.key.toString('hex'))

    feed.createReadStream({live: true}).on('data', (data) => {
        console.log(data.toString())
    })
})

var textarea = document.getElementById('textarea')

textarea.addEventListener('keydown', (e) => {
    feed.append(e.key)
})
