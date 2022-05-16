import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReduser";
import { moviesReducer } from "../reducers/moviesReducer";
import { usersReducer } from "../reducers/usersReducers";

const reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  movies: moviesReducer
});
export const store = createStore(
  reducers, 
  applyMiddleware(thunk)
)