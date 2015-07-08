var client = {

	scheme: 'http://',

	host: 'CLIENT_HOST',
	
	port: CLIENT_PORT,
	
	url: function() { 
		var url = client.scheme + client.host;
		if (client.scheme === 'http://' && client.port === 80) return url;
		else if (client.scheme === 'https://' && client.port === 443) return url;
		return url + ':' + client.port;
	}

};

module.exports = client;
