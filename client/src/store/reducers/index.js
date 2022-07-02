import { combineReducers } from "redux";
import users from "./users_reducer";
import assets from "./assets_reducer";

const appReducers = combineReducers({
  users,
  assets,
});
export default appReducers; // this goes to the index of the store and helps build the store
