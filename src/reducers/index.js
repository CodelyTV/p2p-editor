export default (state = {}, action) => {
  switch(action.type) {
    case 'INITIALIZE_SESSION':
      return {
        ...state,
        userId: action.userId,
        sessionIs: action.sessionId,
        isSessionStarted: false,
        isFollower: action.isFollower
      }

    case 'START_SESSION':
      return {
        ...state,
        isSessionStarted: true,
      }


    case 'USER_CONNECTED':
      return { ...state,
        users: [
          ...state.users,
          {
            id: action.userId,
            displayName: 'Anonymous'
          }
        ]
      }
    case 'SET_DISPLAY_NAME':
      const updatedUsers = state.users.map(user => {
        if(action.userId === user.id){
          return { ...user, displayName: action.displayName }
        }
        return user
      })
      return { ...state, users: updatedUsers }
    default:
      return state
  }
}
