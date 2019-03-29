const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureAuthenticated = require('../helpers/authHelper');
const isObjectEmpty = require('../helpers/utility');
const axios = require('axios');
const User = require('../models/user');
const spotifyWebApi = require('spotify-web-api-node');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
var request = require('request');
var circularJson = require('circular-json');

const baseUrl = 'http://localhost:3000';

router.get('/some', (req, res) => {
	console.log('some');
});

router.get('/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private', 'user-top-read'] }), (req, res) => {
	res.end();
});	

router.get('/spotify/callback', passport.authenticate('spotify', {failureRedirect: `${baseUrl}/login`, successRedirect: `${baseUrl}/`}), (req, res) => {
});		

router.get('/verify', (req, res) => {
	var isAuthenticated = req.isAuthenticated();

	if(!isAuthenticated) {

		res.json({ success: isAuthenticated });

	} else {

		const payload = { id: req.user.spotifyId, email: req.user.email, expiresIn: req.user.expiresIn };
		jwt.sign(payload, keys.key, { expiresIn: 3600 }, (err, token) => {
			res.json({
				success: true,
				token: `Bearer ${token}`
			});
		});
	}
});	

router.get('/getnewtoken', ensureAuthenticated, (req, res) => {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');

	var client_id = keys.clientID;
	var client_secret = keys.clientSecret;

	const authOptions = {

		url: 'https://accounts.spotify.com/api/token',
		headers: {

			Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
		},
		form: {

			grant_type: 'client_credentials',
		},

		json: true
	};

	request.post(authOptions, function(error, response, body) {

		if (!error) {

			if(req.user === undefined) {

				res.redirect('/auth/verify');
				return;
				
			} else {

				User.findById(req.user.id).then((user) => {

					if(user) {

						user.accessToken = body.access_token;
						user.expiresIn = body.expires_in;

						user.save().then(() => {
							res.redirect('/auth/verify');
						});
					} else {

						res.redirect('/auth/verify');
					}

				}).catch((e) => {
					console.log(e);
				});

			}

		} else {

			res.json(error);
		}
	});

});

router.get('/logout', (req, res) => {
	
	req.logOut();
	res.redirect(`${baseUrl}/login`);

});	

router.get('/getme', ensureAuthenticated, (req, res) => {

	console.log(req.user.accessToken);
	var spotifyApi = new spotifyWebApi({
		accessToken: req.user.accessToken	
	});
	spotifyApi.getMe().then((data) => {
		res.json(data);
	}).catch((e) => {
		console.log(e);
	});

});


module.exports = router;