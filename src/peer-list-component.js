class PeerListComponent {

    constructor(peers) {
        this.peers = peers
        this.render()

        this.peers.on('added', (peer) => {
            this.render()
        })
          
        this.peers.on('removed', (peer) => {
            this.render()
        })
    }

    render() {
        const peerList =document.querySelector('#peer-list');
        peerList.innerHTML = ''
        this.peers.forEach((peer) => {
            const peerListElement = document.createElement('li')
            peerListElement.innerHTML = peer._id
            peerList.appendChild(peerListElement)
        })
    }
}

export default PeerListComponent