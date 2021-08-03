const DEFAULT_STATE =  {travels:  []};

const TravelReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "SET_TRAVELS":
      return {
        ...state,
        travels: action.payload
      };
      case "REMOVE_TRAVEL":
      return {
        travels:state.travels.filter(travel=>travel.id != action.payload )
      };
  }
  return state;
};

export default TravelReducer;