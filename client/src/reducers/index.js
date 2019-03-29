import { combineReducers } from 'redux';
import authReducer from './authReducer';
import musicReducer from './musicReducer';

export default combineReducers({

	auth: authReducer,
	music: musicReducer
});