module.exports = sessionIdFromUrl

function sessionIdFromUrl(url) {
    return url.split('/')[3];
}