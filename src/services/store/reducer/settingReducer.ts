import {
  USER_SETTINGS_STATUS,
  IUserSettingsStatus,
} from "../types/ActionTypes";

const initState: UserSettingsStatus = {
  status: 0,
  message: "",
};

function settingsReducer(
  state: UserSettingsStatus = initState,
  action: IUserSettingsStatus
) {
  switch (action.type) {
    case USER_SETTINGS_STATUS:
        console.log(action.payload)
      return {status: action.payload.status, message: action.payload.message}

    default:
      return initState;
  }
}

export default settingsReducer;
