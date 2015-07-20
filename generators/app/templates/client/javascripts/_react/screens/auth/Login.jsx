var React = require('react');
var Input = require('../../components/Input');
var Button = require('../../components/Button');

var Login = React.createClass({

    getInitialState: function() {
        return {
            sending: false
        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.sending) {
            setTimeout(function() {
                this.setState({sending: false});
            }.bind(this), 1000);
        }
    },

	render: function() {
		return (
			<div className='login'>
                <Input caption='test' defaultValue='test2' ref='test' />
                <Button disabled={this.state.sending} onTouchTap={this.login}>login</Button>
            </div>
		);
	},

    login: function(e) {
        e.preventDefault();
        this.setState({sending: true});
        console.log('login', this.refs.test.getValue());
    }

});

module.exports = Login;
