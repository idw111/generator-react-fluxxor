var React = require('react');

var Input = React.createClass({

	getInitialState: function() {
		var disabled = this.props.disabled || false;
		var caption = this.props.caption || '';
		var value = this.props.defaultValue || '';
		return {disabled: disabled, caption: caption, value: value};
	},

	componentWillReceiveProps: function(nextProps) {
		var disabled = this.props.disabled || false;
		var caption = this.props.caption || '';
		var value = this.props.defaultValue || '';
		if (this.state.disabled === disabled && this.state.caption === caption) return;
		this.setState({disabled: disabled, caption: caption});
 	},

	render: function() {
		var classes = ['input'];
		if (this.props.className) classes.push(this.props.className);
		if (this.state.disabled) classes.push('disabled');

		var input = this.state.disabled ? (<span>{this.state.caption}</span>) : (<input placeholder={this.state.caption} type={this.props.type || 'text'} value={this.state.value} onChange={this.onChange} />);

		return (
			<div className={classes.join(' ')}>{input}</div>
		);
	},

	onChange: function(e) {
		var value = e.currentTarget.value;
		this.setState({value: value});
	},

	getValue: function() {
		return this.state.value;
	},

	setValue: function(value) {
		this.setState({value: value});
	}

});

module.exports = Input;
