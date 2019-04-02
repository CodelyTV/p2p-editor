function sessionIdFromUrl(url) {
    return url.split('/')[3] || null
}

export default sessionIdFromUrl