// import { userReduce } from "./userReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  filters: filterReducer,
  user: userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
