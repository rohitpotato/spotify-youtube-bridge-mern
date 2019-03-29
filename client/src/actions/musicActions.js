import Axios from 'axios';
import {GET_TRACK_DETAILS, MUSIC_LOADING, GET_RECOMMENDED_TRACKS, GET_ALBUM_TRACKS, GET_ALBUM_DETAILS, GET_NEW_RELEASES, GET_USER_FAV} from './types';

export const getTrack = (id) => dispatch => {

	dispatch(setMusicLoading());
	var trackData = { trackId: id };
	Axios.post('/music/getTrack', { trackData }).then((res) => {
		dispatch({
			type: GET_TRACK_DETAILS,
			payload: res.data
		});
	}).catch((e) => {	
		console.log(e);
	});
};

export const getRecommendedTracks = (id) => dispatch => {

	dispatch(setMusicLoading);
	const recData = {
			trackId: id
		};
		Axios.post('/music/getrecommendedtracks', { recData }).then((res) => {
			dispatch({ 
				type: GET_RECOMMENDED_TRACKS,
				payload: res.data.tracks
			 });
		}).catch((e) => {
			console.log(e);
		});
};

export const getAlbum = (id) => dispatch => {

	dispatch(setMusicLoading());
	const albumId = { id: id };
	Axios.post('/music/getAlbum', {albumId}).then((res) => {
		dispatch({
			type: GET_ALBUM_DETAILS,
			payload: res.data.album.albums[0]
		});
	}).catch((e) => {
		console.log(e);
	});
};

export const getAlbumTracks = (id) => dispatch => {

	dispatch(setMusicLoading());
	const albumId = { id: id };
		Axios.post('/music/getAlbumTracks', {albumId}).then((res) => {
			dispatch({
				type: GET_ALBUM_TRACKS,
				payload: res.data.albumTracks.items
			});
		}).catch((e) => {
			console.log(e);
		});
};

export const getRecommendedAlbums = (id) => dispatch => {

	dispatch(setMusicLoading());
	const albumId = {id: id};
	Axios.post('/music/getrecommendedalbums', {albumId}).then((res) => {
		dispatch({
			type: GET_RECOMMENDED_TRACKS,
			payload: res.data.tracks
		});
	}).catch((e) => {
		console.log(e);
	});
};

export const getNewReleases = () => dispatch => {

	dispatch(setMusicLoading());
	Axios.get('/music/getnewreleases').then((res) => {
		dispatch({
			type: GET_NEW_RELEASES,
			payload: res.data.data.albums.items
		});
	}).catch((e) => {
		console.log(e);
	});
};

export const getUserFavs = () => dispatch => {

	dispatch(setMusicLoading());
		Axios.get('/music/getuserfavs').then((res) => {
		dispatch({
			type: GET_NEW_RELEASES,
			payload: res
		});
		console.log(res);
	}).catch((e) => {
		console.log(e);
	});
};

export const setMusicLoading = () => {

	return {

		type: MUSIC_LOADING
	}
};