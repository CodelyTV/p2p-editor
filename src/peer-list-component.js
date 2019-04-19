import PeerItemComponent from "./peer-item-component";

class PeerListComponent {

    constructor(peers) {
        this.peers = peers
        this.render()

        this.peers.on('added', () => {
            this.render()
        })
          
        this.peers.on('removed', () => {
            this.render()
        })
    }

    render() {
        const peerList = document.querySelector('#peer-list');
        peerList.innerHTML = ''
        this.peers.forEach((peer) => {
            new PeerItemComponent(peerList, peer)
        })
    }
}

export default PeerListComponent