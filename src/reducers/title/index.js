import { ActionSheetIOS } from "react-native";

const DEFAULT_STATE =  {title: "ANEPCS"};

const titleReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "SET_TITLE":
      return {
        title: action.payload
      };
  }
  return state;
};

export default titleReducer;