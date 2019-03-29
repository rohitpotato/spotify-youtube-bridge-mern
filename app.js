const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);
const cookie = require('cookie-session');
const keys = require('./config/keys');
const auth = require('./routes/auth');
const music = require('./routes/music');
const spotifyWebApi = require('spotify-web-api-node');

app.use(cookie({
	maxAge: 3600000,
	keys: [keys.key]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.promise = global.promise;

mongoose.connect('mongodb://localhost:27017/spotifysome', { useNewUrlParser: true }, () => {
	console.log('Connected to mongodb');
});

app.use(passport.initialize());
app.use(passport.session());

var spotifyApi = new spotifyWebApi({
  clientId: keys.clientID,
  clientSecret: keys.clientSecret,
  redirectUri: keys.callbackURL	
});
	

app.use('/auth', auth);
app.use('/music', music);

const port = 5000;

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});