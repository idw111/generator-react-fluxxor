var React = require('react/addons');
var Router = require('react-router');
var Fluxxor = require('fluxxor');
var routes = require('./routes');
var Stores = require('../_flux/stores');
var Actions = require('../_flux/actions');
var analytics = require('../analytics');
var injectTapEventPlugin = require('react-tap-event-plugin');

var ServiceRouter = {

	run: function() {
		var router = Router.create({routes: routes});
		var stores = Stores.build({router: router});
		var actions = Actions.build();
		var flux = new Fluxxor.Flux(stores, actions);

		injectTapEventPlugin();

		flux.on('dispatch', function(e) {
			console.log('DISPATCH', e)
		});

		router.run(function(Handler) {
			React.render(<Handler flux={flux} />, document.body);
		});

		return flux;
	}

};

module.exports = ServiceRouter;