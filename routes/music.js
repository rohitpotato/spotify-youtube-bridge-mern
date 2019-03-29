const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureAuthenticated = require('../helpers/authHelper');
const spotifyWebApi = require('spotify-web-api-node');
const Axios = require('axios');
var util = require('util');
const keys = require('../config/keys');
const request = require('request');
var circularJson = require('circular-json');
const fs = require('fs');
const youtubedl = require('ytdl-core');

router.post('/search', ensureAuthenticated, async (req, res) => {

	const searchString = req.body.search;

	var spotifyApi = new spotifyWebApi({
		accessToken: req.user.accessToken	
	});

	try {

		const tracks = await spotifyApi.searchTracks(searchString);
		const artists = await spotifyApi.searchArtists(searchString);
		const albums = await spotifyApi.searchAlbums(searchString);
		const playlists = await spotifyApi.searchPlaylists(searchString)

		res.json({
			tracks: tracks,
			artists: artists,
			albums: albums,
			playlists: playlists
		});

	} catch (e) {

		res.json(e);
		console.log(e);

	}

});


router.post('/getTrack', ensureAuthenticated, (req, res) => {

	const trackId = req.body.trackData.trackId;
		Axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers: { 'Authorization': `Bearer ${req.user.accessToken}` } }).then((track) => {
			var resData = circularJson.stringify(track);
			resData = JSON.parse(resData);
			res.json(resData.data);
		}).catch((e) => console.log(e));
});

router.post('/getAlbum', ensureAuthenticated, (req, res) => {

	const albumId = req.body.albumId.id;
	var spotifyApi = new spotifyWebApi({
		accessToken: req.user.accessToken	
	});
	spotifyApi.getAlbums([albumId])
	.then(function(data) {
		res.json({album: data.body});
	}, function(err) {
		res.json(err);
		console.log('Something went wrong!', err);
	});
});

router.post('/getrecommendedtracks', ensureAuthenticated,  async (req, res) => {

	const trackId = req.body.recData.trackId;

	Axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}`, { headers: { 'Authorization': `Bearer ${req.user.accessToken}` } }).then((tracks) => {
			var resData = circularJson.stringify(tracks);
			resData = JSON.parse(resData);
			res.json(resData.data);
	}).catch((e) => console.log(e));
});

router.post('/getAlbumTracks', ensureAuthenticated, (req, res) => {

	const albumId = req.body.albumId.id;
	var spotifyApi = new spotifyWebApi({
		accessToken: req.user.accessToken	
	});
	spotifyApi.getAlbumTracks( albumId)
	.then(function(data) {
		res.json({albumTracks: data.body});
	}, function(err) {
		res.json(err);
		console.log('Something went wrong!', err);
	});
});

router.post('/getrecommendedalbums', ensureAuthenticated, (req, res) => {

	const albumId = req.body.albumId.id;

	Axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=${albumId}`, { headers: { 'Authorization': `Bearer ${req.user.accessToken}` } }).then((tracks) => {
		var resData = circularJson.stringify(tracks);
		resData = JSON.parse(resData);
		res.json(resData.data);
	}).catch((e) => console.log(e));

});

router.get('/getnewreleases', (req, res) => {

	Axios.get(`https://api.spotify.com/v1/browse/new-releases`, { headers: { 'Authorization': `Bearer ${req.user.accessToken}` } }).then((tracks) => {
		var resData = circularJson.stringify(tracks);
		resData = JSON.parse(resData);
		res.json(resData);
	}).catch((e) => {
		console.log('Something went wrong');
		var err = circularJson.stringify(e);
		err = JSON.parse(err);
		res.json(err);
	});

});

router.get('/getuserfavs', (req, res) => {

	Axios.get(`https://api.spotify.com/v1/me/top/tracks`, { headers: { 'Authorization': `Bearer ${req.user.accessToken}` } }).then((tracks) => {
		var resData = circularJson.stringify(tracks);
		resData = JSON.parse(resData);
		res.json(resData);
	}).catch((e) => {
		console.log('Something went wrong');
		var err = circularJson.stringify(e);
		err = JSON.parse(err);
		res.json(err);
	});

});

router.get('/download', (req, res) => {
	var URL = req.query.URL;
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	youtubedl(URL, {
		format: 'mp4'
	}).pipe(res);
});

router.get('/testroute', async (req, res) => {
	var spotifyApi = new spotifyWebApi({
		accessToken: req.user.accessToken	
	});
	const relatedArt = await spotifyApi.searchPlaylists('workout');
	res.json(relatedArt);
});

module.exports = router;