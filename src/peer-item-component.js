class PeerItemComponent {

    constructor(peerList, peer) {
        this.render(peerList, peer.id)

        peer.subscribe((data) => {
            if (data.action === 'SET_DISPLAY_NAME') {
                this.render(peerList, peer.id, data.name)
            }
        })
    }

    render(peerList, id, name = 'anonymous') {
        const peerListElement = document.getElementsByClassName(id)

        if (peerListElement.length === 0) {
            const peerListElement = document.createElement('li')
            peerListElement.className = id
            peerList.appendChild(peerListElement)
        }

        peerListElement[0].innerHTML = name
    }
}

export default PeerItemComponent