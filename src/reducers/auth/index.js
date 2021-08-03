const DEFAULT_STATE =  {isLoggedIn: true};

const sessionReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false
      };
  }
  return state;
};

export default sessionReducer;