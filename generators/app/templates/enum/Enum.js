'use strict';

var Enum = {

	keys: function(enumeration) {
		var result = [];
		for (var key in enumeration) {
			var value = enumeration[key];
			if (typeof value === 'object') result = result.concat(Enum.keys(value));
			else if (typeof value === 'string') result.push(key);
		}
		return result;
	},

	values: function(enumeration) {
		var result = [];
		for (var key in enumeration) {
			var value = enumeration[key];
			if (typeof value === 'object') result = result.concat(Enum.values(value));
			else if (typeof value === 'string') result.push(value);
		}
		return result;
	}

};

module.exports = Enum;
