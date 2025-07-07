import { all } from "redux-saga/effects";
import Login from "./auth/loginSaga";
import TwoAuthenticationSaga from "./auth/twoAuthenticationSaga";
import Logout from "./auth/logoutSaga";
import LoginHistory from "./auth/loginHistorySaga";
import GetAuthDetail from "./auth/getAuthDetailSaga";

import AddCurrency from "./currency/addCurrencySaga";
import GetCurrency from "./currency/getCurrencySaga";
import ChangeBetfairCurrency from "./currency/changeBetfairCurrency";
import GlobalCurrencyValue from "./currency/globalCurrencyValueSaga";
import LayerCurrency from "./currency/layerCurrencySaga";

import postNotificationSaga from "./notification/postNotificationSaga";
import getAllusersSaga from "./notification/getAllusersSaga";
import deleteNotificationSaga from "./notification/deleteNotificationSaga";
import editNotificationSaga from "./notification/editNotificationSaga";

import TwoFactorStatusUpdateSaga from "./TwoFA/TwoFactorStatusUpdateSaga";
import VerifyTwoFactorCodeSaga from "./TwoFA/VerifyTwoFactorCodeSaga";
import GoogleLoginValidationSaga from "./TwoFA/googleLoginValidationSaga";
import GenerateQRCodeSaga from "./TwoFA/GenerateQRCodeSaga";
import GoogleAuthenticatorOTPValidationSaga from "./TwoFA/GoogleAuthenticatorOTPValidationSaga";

export default function* rootSaga() {
  yield all([

    Login(),
    TwoAuthenticationSaga(),
    Logout(),
    LoginHistory(),
    GetAuthDetail(),
    AddCurrency(),
    GetCurrency(),
    ChangeBetfairCurrency(),
    GlobalCurrencyValue(),
    LayerCurrency(),
    postNotificationSaga(),
    getAllusersSaga(),
    deleteNotificationSaga(),
    editNotificationSaga(),
    TwoFactorStatusUpdateSaga(),
    VerifyTwoFactorCodeSaga(),
    GoogleLoginValidationSaga(),
    GenerateQRCodeSaga(),
    GoogleAuthenticatorOTPValidationSaga(),

  ]);
}
