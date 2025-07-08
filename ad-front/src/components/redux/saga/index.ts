import { all } from "redux-saga/effects";
import watchLoginAPI from "./auth/loginSaga";
import watchLogoutAPI from "./auth/logoutSaga";

export default function* rootSaga() {
  yield all([watchLoginAPI(), watchLogoutAPI()]);
}
