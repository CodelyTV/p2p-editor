function sessionIdFromUrl(url) {
  const path = url.split('/')[3]
  const sessionId = path.split('?')[0]
  return sessionId || null
}

export default sessionIdFromUrl