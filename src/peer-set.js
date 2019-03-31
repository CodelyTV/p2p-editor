import EventEmitter from 'events'

class PeerSet extends EventEmitter {

    constructor() {
        super()
        this.peers = []
    }

    has(peer) {
        return this.peers.indexOf(peer) !== -1
    }

    add(peer) {
        if (this.has(peer)) {
            return
        }

        this.peers.push(peer)
        this.emit('added', peer)
    }

    remove(peer) {
        var index = this.peers.indexOf(peer)
        if (index === -1) {
            return
        }

        this.peers.splice(index, 1)
        this.emit('removed', peer)
    }

    forEach(callback) {
        this.peers.forEach(callback)
    }
}

export default PeerSet