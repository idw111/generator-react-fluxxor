var React = require('react');
var Router = require('react-router');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var RouteHandler = Router.RouteHandler;
var AnalyticsClient = require('../_ajax/AnalyticsClient');

var Service = React.createClass({
	
	contextTypes: {router: React.PropTypes.func},

	mixins: [FluxMixin],

	componentDidMount: function() {
		AnalyticsClient.sendPageview(this.context.router.getCurrentPath());
	},

	componentWillReceiveProps: function(nextProps) {
		AnalyticsClient.sendPageview(this.context.router.getCurrentPath());
	},

	render: function() {
		return (
			<div className='service'>
				<RouteHandler />
			</div>
		);
	}

});

module.exports = Service;
