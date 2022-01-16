import {
  USER_SETTINGS_STATUS,
  IUserSettingsStatus,
} from "../types/ActionTypes";

const initState: UserSettingsStatus = {
  nameInput: "",
  message: "",
};

function settingsReducer(
  state: UserSettingsStatus = initState,
  action: IUserSettingsStatus
) {
  switch (action.type) {
    case USER_SETTINGS_STATUS:
      return {
        ...state,
        nameInput: action.payload.nameInput,
        message: action.payload.message,
      };

    default:
      return state;
  }
}

export default settingsReducer;
