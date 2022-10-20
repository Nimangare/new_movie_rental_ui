import { REGISTER_USER } from "../actions/types";

const registerReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case REGISTER_USER:
      console.log(action.user);
      return {
        users: [...state.users],
      };
    default:
      return state;
  }
};

export default registerReducer;
