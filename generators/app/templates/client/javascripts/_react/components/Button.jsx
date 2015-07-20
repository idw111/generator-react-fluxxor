var React = require('react');

var Button = React.createClass({

	getInitialState: function() {
		var disabled = this.props.disabled || false;
		var title = this.props.text || this.props.children || '';
		return {disabled: disabled, title: title};
	},

	componentWillReceiveProps: function(nextProps) {
		var disabled = nextProps.disabled || false;
		var title = nextProps.text || nextProps.children || '';
		if (this.state.disabled === disabled && this.state.title === title) return;
		this.setState({disabled: disabled, title: title});
 	},

	render: function() {
		var classes = ['button'];
		if (this.props.className) classes.push(this.props.className);
		if (this.state.disabled) classes.push('disabled');

		var button = this.state.disabled ? (<span>{this.state.title}</span>) : (<button onTouchTap={this.props.onTouchTap}>{this.state.title}</button>);

		return (
			<div className={classes.join(' ')}>{button}</div>
		);
	}

});

module.exports = Button;
