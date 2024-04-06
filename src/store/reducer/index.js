import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { User } from "./User";
import { Product } from "./Product";

const appReducer = combineReducers({
  user: User,
  product: Product
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const middlewareList = [thunk];
const middleware = composeWithDevTools(applyMiddleware(...middlewareList));

export const store = createStore(rootReducer, middleware);
