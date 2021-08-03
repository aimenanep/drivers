const DEFAULT_STATE =  {token: ""};

const tokenReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload
      };
  }
  return state;
};

export default tokenReducer;