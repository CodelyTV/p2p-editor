class Peer {
    constructor(id, actionStore) {
        this.id = id
        this.actionStore = actionStore
    }

    subscribe(fn) {
        this.actionStore.createReadStream({live: true})
            .on('data', fn)
    }
}

export default Peer