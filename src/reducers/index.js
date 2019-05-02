export default (state = {}, action) => {
  switch(action.type) {
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
