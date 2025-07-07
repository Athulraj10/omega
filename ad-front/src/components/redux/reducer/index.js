import { combineReducers } from "redux";
import Login from "./auth/loginReducer";
import TwoFactorAuthencation from "./auth/twoAuthenticationReducer";
import Logout from "./auth/logoutReducer";
import LoginHistory from "./auth/loginHistoryReducer";
import GetAuthDetail from "./auth/authDetailReducer";

import AddCurrency from "./currency/addCurrencyReducer";
import GetCurrency from "./currency/getCurrencyReducer";
import currencyLayerReducer from "./currency/getLayerCurrencyReducer";
import globalCurrencyValueReducer from "./currency/globalCurrencyValueReducer";
import ChangeBetfairCurrency from "./currency/changeBetfairCurrency";


const appReducer = combineReducers({

  Login,
  TwoFactorAuthencation,
  Logout,
  LoginHistory,
  GetAuthDetail,
  AddCurrency,
  GetCurrency,
  currencyLayerReducer,
  globalCurrencyValueReducer,
  ChangeBetfairCurrency,
});

const reducers = (state, action) => {
  return appReducer(state, action);
};

export default reducers;
