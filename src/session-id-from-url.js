function sessionIdFromUrl(url) {
  const path = new URL(url).pathname
  const sessionId = path.split('/')[1]
  return sessionId || null
}

export default sessionIdFromUrl