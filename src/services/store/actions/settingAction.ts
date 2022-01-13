import {
  USER_SETTINGS_STATUS,
  IUserSettingsStatus,
} from "../types/ActionTypes";

export function userSettingsStatus(
  status: UserSettingsStatus
): IUserSettingsStatus {
  return {
    type: USER_SETTINGS_STATUS,
    payload: status,
  };
}
