// =====================Login===========================
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export interface LoginPayload {
  data: {
    email: string;
    password: string;
  };
  callback: (data: any) => void;
}
export interface LoginAction {
  type: typeof LOGIN;
  payload: LoginPayload;
}
export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
}
// =====================Login===========================
export type AuthActionType =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction;
