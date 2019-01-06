const defaultState = {
  currentUser: {
    isLoggedIn: false,
    uid: ""
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'POST_REGISTER':
      return {
        ...state,
        currentUser: {
          isLoggedIn: true
        }
      }
    case 'POST_LOGIN':
      return {
        ...state,
        currentUser: {
          isLoggedIn: true,
          uid: action.data
        }
      }

    case 'POST_LOGOUT':
      return {
        ...state,
        currentUser: {
          isLoggedIn: false
        }
      }

    default:
      return state;

  }

};