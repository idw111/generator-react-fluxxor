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

var Login = require('./screens/auth/Login');
var Signup = require('./screens/auth/Signup');

var routes = (
	<Route name='Service' handler={Service}>
		<Route name='Application' path='/' handler={Application}>
			<DefaultRoute handler={Home} />
		</Route>

		<Route name='Authentication' path='/auth' handler={RouteHandler}>
			<DefaultRoute handler={Login} />
			<Route name='Login' path='login' handler={Login} />
			<Route name='Signup' path='signup' handler={Signup} />
			<Route name='_Login' path='/login' handler={Login} />
			<Route name='_Signup' path='/signup' handler={Signup} />
		</Route>
	</Route>
);

module.exports = routes;
