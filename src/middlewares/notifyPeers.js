export default log => {
  return store => next => action => {
    if (action.type === 'SET_DISPLAY_NAME' && action.userId === log.key.toString('hex')) {
      log.append(action)
    }
    if (action.type === 'SELECT_EDITOR_LANGUAGE' && !store.getState().isFollower) {
      log.append(action)
    }
    return next(action)
  }
}
