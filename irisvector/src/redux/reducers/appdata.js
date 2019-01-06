const defaultState = {
  bet_categories: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'POST_INITDATA':
    console.info(action.data);
      return {
        ...state,
        bet_categories: action.data
      }
    default:
      return state;

  }

};