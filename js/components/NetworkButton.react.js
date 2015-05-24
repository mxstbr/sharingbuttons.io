var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var NetworkButton = React.createClass({
	render: function() {
		return (
			<div className="generator__network-button generator__network-button--active">
				<label>
					<input type="checkbox" onChange={ this._toggleNetwork } checked={ this.props.checked }/>
					{ this.props.name }
				</label>
			</div>
		);
	},
	_toggleNetwork: function() {
		var elem = this.getDOMNode();
		elem.classList.toggle("generator__network-button--active");
		AppActions.toggleNetwork(this.props.network);
	}
});

module.exports = NetworkButton;