var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Input = require('../../components/Input');
var Button = require('../../components/Button');

var Signup = React.createClass({

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
			<div className='signup'>
                <Input caption='username' ref='username' />
				<Input caption='password' ref='password' type='password' />
				<Input caption='nickname' ref='nickname' />
				<Input caption='email' ref='email' type='email' />
                <Button disabled={this.state.sending} onTouchTap={this.signup}>signup</Button>
            </div>
		);
	},

    signup: function(e) {
        e.preventDefault();
        var username = this.refs.username.getValue();
		var password = this.refs.password.getValue();
		var nickname = this.refs.nickname.getValue();
		var email = this.refs.email.getValue();
        this.getFlux().actions.SESSION.signup(username, password, nickname, email);
        this.setState({sending: true});
    }

});

module.exports = Signup;
