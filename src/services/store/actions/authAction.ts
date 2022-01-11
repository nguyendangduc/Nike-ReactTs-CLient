import {
  USER_FETCH_SUCCESS,
  IUserFetchSuccess,
  USER_FETCH_ERROR,
  IUserFetchError,
  LOGOUT_SUCCESS,
  ILogoutSuccess,
} from "../types/ActionTypes";

export function userFetchSuccess(userData: User): IUserFetchSuccess {
  return {
    type: USER_FETCH_SUCCESS,
    payload: userData,
  };
}
export function userFetchError(error: any): IUserFetchError {
  return {
    type: USER_FETCH_ERROR,
    payload: error,
  };
}

export function logoutSuccess(): ILogoutSuccess {
  return {
    type: LOGOUT_SUCCESS,
  };
}
