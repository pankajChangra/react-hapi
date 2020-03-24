import { combineReducers } from "redux";
import auth from "./auth.red";

export default combineReducers({
  auth: auth,
});
