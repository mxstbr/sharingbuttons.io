var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var SizeOption = React.createClass({
	render: function() {
		var size = this.props.size;

		return (
			<label>
				<input type="radio" onChange={ this._changeSize } checked={this.props.checked} />{ size.charAt(0).toUpperCase() + size.slice(1) }
			</label>
		);
	},
	_changeSize: function(evt) {
		var elem = this.getDOMNode();
		AppActions.changeSize($(elem).text().toLowerCase());
	}
});

module.exports = SizeOption;