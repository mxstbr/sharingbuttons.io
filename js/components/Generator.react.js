var NetworkSelectionButton = require('./NetworkSelectionButton.react');
var PreviewButton = require('./PreviewButton.react');
var Code = require('./Code.react');
var AppActions = require('../actions/AppActions');
var GeneratorPreview = require('./GeneratorPreview.react');
var SelectionButton = require('./SelectionButton.react');

var Generator = React.createClass({
	render: function() {
		var data = this.props.data;
		var text = data.text;
		var url = data.url;
		var sizes = data.sizes;
		var networks = data.networks;
		var icons = data.icons;
		var style = data.style;

		var networkSelectionButtons = [];
		var previewButtons = [];
		var sizeOptions = [];
		var iconSelectionButtons = [];
		var selectedSize;
		var selectedIcon;

		// Icon size selection
		for (var icon in icons) {
			if (icons[icon] === true) {
				selectedIcon = icon;
			}
			iconSelectionButtons.push(<SelectionButton key={"select-icon-" + icon} element={icon} selected={icons[icon]} selectOption={this._changeIcon} />);
		}
		var iconOptionAmount = iconSelectionButtons.length;

		// Button size selection
		for (var size in sizes) {
			if (sizes[size] === true) {
				var selectedSize = size;
			}
			sizeOptions.push(<SelectionButton key={"select-size-" + size} element={size} selected={sizes[size]} selectOption={this._changeSize} />)
		}
		var sizeOptionAmount = sizeOptions.length;

		// Social network selection and preview buttons
		for (var network in networks) {
			networkSelectionButtons.push(<NetworkSelectionButton key={ network + "-button" } network={network} name={networks[network].name} checked={networks[network].visible} />)
			if (networks[network].visible === true) {
				previewButtons.push(<PreviewButton key={ network + "-social-button"} url={url} text={text} network={networks[network] } id={ network } size={ selectedSize } icon={selectedIcon} />)
			}
		}

		// Render the Generator
		return (
			<div className="generator">
				<div className="generator__inner-wrapper">
					<div className="generator__settings">
						<label className="generator__label">URL
							<input className={"generator__settings-field generator__settings-url"} onChange={this._setURL} value={url} />
						</label>
						<label className="generator__label">Text
							<input className={"generator__settings-field generator__settings-text"} onChange={this._setText} value={text} />
						</label>
						<div className="generator__networks">
							<h3>Social Networks</h3>
							{ networkSelectionButtons }
						</div>
						<h3>Size</h3>
						<div className={"generator__sizes generator__radio--" + sizeOptionAmount}>
							{ sizeOptions }
						</div>
						<h3>Icon</h3>
						<div className={"generator__icons generator__radio--" + iconOptionAmount}>
							{ iconSelectionButtons }
						</div>
					</div>
					<GeneratorPreview previewButtons={previewButtons} />
				</div>
				<Code url={url} text={text} networks={networks} size={selectedSize} style={style} icon={selectedIcon} />
			</div>
		);
	},
	// Dispatches event to change the shared URL
	_setURL: function(evt) {
		AppActions.setURL(evt.target.value);
	},
	// Dispatches event to change the shared text
	_setText: function(evt) {
		AppActions.setText(evt.target.value);
	},
	// Dispatches event to change the button size
	_changeSize: function(evt) {
		AppActions.changeSize(evt.target.textContent.toLowerCase());
	},
	// Dispatches event to change icon type
	_changeIcon: function(evt) {
		AppActions.changeIcon(evt.target.textContent.toLowerCase());
	}
});

module.exports = Generator;
