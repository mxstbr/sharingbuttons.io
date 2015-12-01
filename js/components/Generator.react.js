var PreviewButton = require('./PreviewButton.react');
var Code = require('./GeneratorCode.react');
var AppActions = require('../actions/AppActions');
var Preview = require('./GeneratorPreview.react');
var SelectionButton = require('./SelectionButton.react');

var Generator = React.createClass({
	render: function() {
		var data = this.props.data;
		var text = data.text;
		var url = data.url;
		var sizes = data.sizes;
		var networks = data.networks;
		var icons = data.icons;

		var networkSelectionButtons = [];
		var previewButtons = [];
		var sizeSelectionButtons = [];
		var iconSelectionButtons = [];
		var HTMLCodeForCurrentButtons = "";
		var CSSCodeForCurrentButtons = data.generalStyling + "\n\n";
		var selectedSize;
		var selectedIcon;

		// Icon size selection
		for (var icon in icons) {
			if (icons[icon] === true) {
				selectedIcon = icon;
			}
			iconSelectionButtons.push(<SelectionButton key={"select-icon-" + icon} element={icon} selected={icons[icon]} selectOption={this._changeIcon} classNameSuffix={"shape"} />);
		}
		var iconOptionAmount = iconSelectionButtons.length;

		// Button size selection
		for (var size in sizes) {
			if (sizes[size] === true) {
				var selectedSize = size;
			}
			sizeSelectionButtons.push(<SelectionButton key={"select-size-" + size} element={size} selected={sizes[size]} selectOption={this._changeSize} classNameSuffix={"size"} />)
		}
		var sizeOptionAmount = sizeSelectionButtons.length;

		// Social network selection buttons
		for (var network in networks) {
			networkSelectionButtons.push(<SelectionButton key={ network + "-button" } element={networks[network].icons[selectedIcon]} selected={networks[network].visible} selectOption={this._toggleNetwork} nameInState={network} classNameSuffix={"network"} />)
			// If the network is selected, show it in the preview
			if (networks[network].visible === true) {
				previewButtons.push(<PreviewButton key={ network + "-social-button"} url={url} text={text} network={networks[network] } id={ network } size={ selectedSize } icon={networks[network].icons[selectedIcon]} />);
				HTMLCodeForCurrentButtons += "<!-- Sharingbutton " + networks[network].name + " -->\n"
				HTMLCodeForCurrentButtons += React.renderToStaticMarkup(<PreviewButton key={ network + "-social-button"} url={url} text={text} network={networks[network] } id={ network } size={ selectedSize } icon={networks[network].icons[selectedIcon]} />);
				HTMLCodeForCurrentButtons += "\n\n";
				CSSCodeForCurrentButtons += networks[network].style;
				CSSCodeForCurrentButtons += "\n\n";
			}
		}

		// Add proper indentation for HTML Code Preview
		HTMLCodeForCurrentButtons = HTMLCodeForCurrentButtons.replace(/<div class="resp-sharing-button /g, '\n  <div class="resp-sharing-button ');
		HTMLCodeForCurrentButtons = HTMLCodeForCurrentButtons.replace(/<div class="resp-sharing-button__/g, '\n    <div class="resp-sharing-button__');
		HTMLCodeForCurrentButtons = HTMLCodeForCurrentButtons.replace(/<\/div><\/div>/g, "\n    </div>\n  </div>");
		HTMLCodeForCurrentButtons = HTMLCodeForCurrentButtons.replace(/<\/div>Share on/g, "\n    </div>Share on");
		HTMLCodeForCurrentButtons = HTMLCodeForCurrentButtons.replace(/<\/a>/g, "\n</a>");

		// Render the Generator
		return (
			<div className="generator">
				<div className="generator__inner-wrapper">
					<div className="generator__settings">
						<div className="generator__settings-field-wrapper generator__settings-field-wrapper--hover">
							<label className="generator__settings-section-heading" htmlFor="url">URL</label>
							<input className="generator__settings-field generator__settings-url" id="url" onChange={this._setURL} value={url} />
						</div>
						<div className="generator__settings-field-wrapper generator__settings-field-wrapper--hover">
							<label className="generator__settings-section-heading" htmlFor="text">Text</label>
							<input className="generator__settings-field generator__settings-text" id="text" onChange={this._setText} value={text} />
						</div>
						<div className="generator__settings-field-wrapper">
							<h3 className="generator__settings-section-heading">Social Networks</h3>
							<div className="generator__settings-field">
								{ networkSelectionButtons }
							</div>
						</div>
						<div className="generator__settings-field-wrapper">
							<h3 className="generator__settings-section-heading">Size</h3>
							<div className="generator__settings-field">
								{ sizeSelectionButtons }
								<div className="generator__radiobutton-bullet"></div>
							</div>
						</div>
						<div className="generator__settings-field-wrapper">
							<h3 className="generator__settings-section-heading">Icon</h3>
							<div className="generator__settings-field">
								{ iconSelectionButtons }
								<div className="generator__radiobutton-bullet"></div>
							</div>
						</div>
					</div>
					<Preview previewButtons={previewButtons} />
				</div>
				<Code networks={networks} HTMLForButtons={HTMLCodeForCurrentButtons} CSSForButtons={CSSCodeForCurrentButtons} />
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
	_changeSize: function(name) {
		AppActions.changeSize(name);
	},
	// Dispatches event to change icon type
	_changeIcon: function(name) {
		AppActions.changeIcon(name);
	},
	// Dispatches event to change network selection
	_toggleNetwork: function(name) {
		AppActions.toggleNetwork(name);
	}
});

module.exports = Generator;
