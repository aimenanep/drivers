const DEFAULT_STATE =  {wilayas:[]};

const RegionReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "SET_WILAYAS":
      return {
        ...state,
        wilayas: action.payload
      };
  }
  return state;
};

export default RegionReducer;