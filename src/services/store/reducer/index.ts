import { combineReducers } from 'redux'
import {configureStore} from '@reduxjs/toolkit'

import authReducer from './authReducer'
import settingsReducer from './settingReducer'

export default combineReducers({
    authReducer,
    settingsReducer
})