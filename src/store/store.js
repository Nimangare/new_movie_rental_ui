import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const composeInhancers = composeWithDevTools({
  trace: true,
});
export default createStore(
  rootReducer,
  composeInhancers(applyMiddleware(thunk))
);
