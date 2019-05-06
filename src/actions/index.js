export function initializeSession(userId, sessionId, isFollower) {
  return {
    type: 'INITIALIZE_SESSION',
    userId,
    sessionId,
    isFollower
  }
}

export function userConnected(userId) {
  return {
    type: 'USER_CONNECTED',
    userId
  }
}

export function startSession() {
  return {
    type: 'START_SESSION'
  }
}

export function setDisplayName(userId, displayName) {
  return {
    type: 'SET_DISPLAY_NAME',
    userId: userId,
    displayName: displayName
  }
}
