var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var NetworkButton = require('./NetworkButton.react');
var SocialButton = require('./SocialButton.react');
var Code = require('./Code.react');

var Generator = React.createClass({
	render: function() {
		var data = this.props.data;
		var text = data.text;
		var url = data.url;
		var sizes = data.sizes;
		var networks = data.networks;
		var icons = data.icons;
		var style = data.style;

		var networkButtons = [];
		var socialButtons = [];
		var sizeOptions = [];
		var iconOptions = [];
		var size;
		var selectedIcon;

		for (var icon in icons) {
			iconOptions.push(<option key={ "icon-option--" + icon } value={icon}>{icon}</option>);
			if (icons[icon] === true) {
				selectedIcon = icon;
			}
		}

		for (var option in sizes) {
			sizeOptions.push(<option key={ "size-option--" + option } value={option}>{option}</option>);
			if (sizes[option] === true) {
				size = option;
			}
		}

		for (var network in networks) {
			networkButtons.push(<NetworkButton key={ network + "-button" } network={network} name={networks[network].name} checked={networks[network].visible} />)
			if (networks[network].visible === true) {
				socialButtons.push(<SocialButton key={ network + "-social-button"} url={url} text={text} network={networks[network] } id={ network } size={ size } icon={selectedIcon} />)
			}
		}

		return (
			<div className="generator">
				<h2 style={ { display: "none" } }>Generator</h2>
				<div className="generator__options">
					<form className="generator__form">
						<label>
							<h3>URL</h3>
							<input name="url" type="url" className="generator__url" placeholder="http://sharingbuttons.io" onChange={this._setURL} />
						</label>
						<label >
							<h3>Text</h3>
							<textarea name="text" className="generator__text" placeholder="Super fast and easy Social Media Sharing Buttons. No JavaScript. No tracking." onChange={this._setText}/>
						</label>
					</form>
					<h3>Social Networks</h3>
					<div className="generator__networks">
						{ networkButtons }
					</div>
					<div className="generator__sizes">
						<h3>Size</h3>
						<div className="select">
							<select aria-label="Select size" value={size} onChange={this._changeSize} >
								{ sizeOptions }
							</select>
						</div>
					</div>
					<div className="generator__icons">
						<h3>Icon</h3>
						<div className="select">
							<select aria-label="Select icon type" value={selectedIcon} onChange={this._changeIcon} >
								{ iconOptions }
							</select>
						</div>
					</div>
				</div>
				<div className="generator__buttons">
					<h3>Preview</h3>
					{ socialButtons }
				</div>
				<hr />
				<Code url={url} text={text} networks={networks} size={size} style={style} icon={selectedIcon} />
			</div>
		);
	},
	_setURL: function(evt) {
		AppActions.setURL(evt.target.value);
	},
	_setText: function(evt) {
		AppActions.setText(evt.target.value);
	},
	_changeSize: function(evt) {
		AppActions.changeSize(evt.target.value.toLowerCase());
	},
	_changeIcon: function(evt) {
		AppActions.changeIcon(evt.target.value.toLowerCase());
	}
});

module.exports = Generator;