var React = require('react');
var Router = require('react-router');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var RouteHandler = Router.RouteHandler;
var SessionMixin = require('./mixins/SessionMixin');

var Application = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	mixins: [FluxMixin, StoreWatchMixin('SESSION'), SessionMixin],

	getStateFromFlux: function() {
		return {
			session: this.getFlux().store('SESSION').getState()
		};
	},

	render: function() {
		if (!this.shouldRender(this.state.session)) return null;
		return (
			<div className='application'>
				<RouteHandler />
			</div>
		);
	}

});

module.exports = Application;
