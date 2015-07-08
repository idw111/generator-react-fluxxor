'use strict';

var Enum = require('./Enum');

var UserProvider = {
	
	UNKNOWN: 'unknown',

	FACEBOOK: 'facebook',

	GOOGLE: 'google',

	TWITTER: 'twitter',

	KAKAO: 'kakao',

	NAVER: 'naver',

	LOCAL: 'local',

	toArray: function() {
		return Enum.values(UserProvider);
	}

};

module.exports = UserProvider