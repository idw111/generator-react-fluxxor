var client = {

	scheme: 'http://',

	host: 'localhost',

	port: 3000,

	url: function(path) {
		var url = client.scheme + client.host;
		if (client.scheme === 'http://' && client.port === 80) return url + (path || '');
		else if (client.scheme === 'https://' && client.port === 443) return url + (path || '');
		return url + ':' + client.port + (path || '');
	}

};

module.exports = client;
