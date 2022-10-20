import { LOGIN_USER } from "../actions/types";

const logInReducer = (state = { token: "" }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default logInReducer;
