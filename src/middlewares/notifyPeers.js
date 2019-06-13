export default log => {
  return store => next => action => {
    if (action.type === 'SET_DISPLAY_NAME' && action.userId === log.key.toString('hex')) {
      log.append(action)
    }
    return next(action)
  }
}
