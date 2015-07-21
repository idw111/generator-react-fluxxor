var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Input = require('../../components/Input');
var Button = require('../../components/Button');

var Login = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin('SESSION')],

    getStateFromFlux: function() {
        return this.getFlux().store('SESSION').getState();
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.sending) {
            setTimeout(function() {
                this.setState({sending: false});
            }.bind(this), 500);
        }
    },

	render: function() {
		return (
			<div className='login'>
                <Input caption='username' ref='username' />
                <Input caption='password' ref='password' type='password' />
                <Button disabled={this.state.sending} onTouchTap={this.login}>login</Button>
            </div>
		);
	},

    login: function(e) {
        e.preventDefault();
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();
        this.getFlux().actions.SESSION.login(username, password);
        this.setState({sending: true});
    }

});

module.exports = Login;
