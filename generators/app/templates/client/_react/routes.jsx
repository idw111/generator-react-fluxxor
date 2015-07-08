var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var Link = Router.Link;

var Service = require('./Service');
var Application = require('./Application');
var Home = require('./screens/Home');

var routes = (
	<Route name='Service' handler={Service}>
		<Route name='Application' handler={Application} path='/'>
			<DefaultRoute handler={Home} />
		</Route>
	</Route>
);

module.exports = routes;