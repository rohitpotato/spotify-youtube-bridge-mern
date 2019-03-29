import { GET_TRACK_DETAILS, MUSIC_LOADING, GET_RECOMMENDED_TRACKS, GET_ALBUM_TRACKS, GET_RECOMMENDED_ALBUMS, GET_ALBUM_DETAILS, GET_NEW_RELEASES, GET_USER_FAVS } from '../actions/types';

const initialState = {

	track: null,
	tracks: null,
	loading: false,
	albumTracks: null,
	favs: null,
	newreleases: null
};

export default function(state=initialState, action) {

	switch(action.type) {

		case MUSIC_LOADING:
			return {

				loading: true
			};

		case GET_TRACK_DETAILS:
			return {
				...state,
				track: action.payload,
				loading: false
			};

		case GET_RECOMMENDED_TRACKS:
			return {

				...state,
				tracks: action.payload,
				loading: false
			};

		case GET_ALBUM_TRACKS:
			return {
				...state,
				albumTracks: action.payload,
				loading: false
			};
		
		case GET_ALBUM_DETAILS:
			return {
				...state,
				album: action.payload,
				loading: false
			};

		case GET_NEW_RELEASES:
			return {

				...state, 
				newreleases: action.payload,
				loading: false
			};

		case GET_USER_FAVS:
			return {
				...state,
				favs: action.payload,
				loading: false
			};

		default:
			return state;
	}
};