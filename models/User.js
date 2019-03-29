const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = mongoose.Schema({

	spotifyId: {

		type: String, 
		required:true
	},

	email: {

		type: String,
		required: true
	},

	name: {

		type: String
	},

	accessToken: {

		type: String,
		required: true
	},
	
	expiresIn: {

		type: String,
		required: true
	}
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
