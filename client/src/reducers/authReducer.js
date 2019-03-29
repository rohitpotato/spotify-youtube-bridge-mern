import {SET_CURRENT_USER, CLEAR_CURRENT_USER} from '../actions/types';
import {isEmpty} from '../helpers/isEmpty';
var jwtDecode = require('jwt-decode');

const initialState = {

	isAuthenticated: false,
	user: null
};

export default function(state = initialState, action) {

	switch(action.type) {

		case SET_CURRENT_USER:
			return {

				...state,
				isAuthenticated: action.payload.success,
				user: action.payload.token ? jwtDecode(action.payload.token) : null
			}

			case CLEAR_CURRENT_USER:
				return {

					...state,
					isAuthenticated: false,
					user: null
				}

		default: 
			return state;
	}
};