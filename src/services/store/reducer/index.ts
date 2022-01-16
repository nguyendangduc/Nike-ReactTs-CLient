import { combineReducers } from 'redux'

import authReducer from './authReducer'
import settingsReducer from './settingReducer'

export default combineReducers({
    authReducer,
    settingsReducer
})