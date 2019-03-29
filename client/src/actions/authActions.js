import Axios from 'axios';
import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from './types';
var jwtDecode = require('jwt-decode');


export const verify = (history) => dispatch => {

	Axios.get('/auth/getnewtoken').then((res) => {

		if(!res.data.success) {

			dispatch(logoutUser());
			history.push('/login');

		} else {
				
			localStorage.setItem('jwtToken', res.data.token);

			dispatch(setCurrentUser(res.data));

		}

	}).catch((e) => {

		console.log(e);
	});
}

export const setCurrentUser = (decoded) => {

	return {

		type: SET_CURRENT_USER,
		payload: decoded
	}
};

export const logoutUser = () => {

	return {

		type: CLEAR_CURRENT_USER
	}
};
