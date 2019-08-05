export default (state = {}, action) => {
  switch(action.type) {
    case 'INITIALIZE_SESSION':
      return {
        ...state,
        userId: action.userId,
        sessionId: action.sessionId,
        isSessionStarted: false,
        isFollower: action.isFollower,
        editorLanguageId: 'javascript'
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

    case 'USER_DISCONNECTED':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId),
      }

    case 'SET_DISPLAY_NAME': {
      const updatedUsers = state.users.map(user => {
        if(action.userId === user.id){
          return { ...user, displayName: action.displayName }
        }
        return user
      })
      return { ...state, users: updatedUsers }
    }

    case 'SELECT_EDITOR_LANGUAGE':
      return {
        ...state,
        editorLanguageId: action.languageId
      }

    default:
      return state
  }
}
