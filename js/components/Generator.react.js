var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var NetworkButton = require('./NetworkButton.react');
var SocialButton = require('./SocialButton.react');
var SizeOption = require('./SizeOption.react');
var Code = require('./Code.react');

var Generator = React.createClass({
	render: function() {
		var data = this.props.data;
		var text = data.text;
		var url = data.url;
		var sizes = data.sizes;
		var networks = data.networks;
		var networkButtons = [];
		var socialButtons = [];
		var sizeOptions = [];
		var size;

		for (var option in sizes) {
			sizeOptions.push(<SizeOption size={ option } key={ "size-option--" + option } checked={ sizes[option] } />);
			if (sizes[option] === true) {
				size = option;
			}
		}

		for (var network in networks) {
			networkButtons.push(<NetworkButton key={ network + "-button" } network={network} name={networks[network].name} checked={networks[network].visible} />)
			if (networks[network].visible === true) {
				socialButtons.push(<SocialButton key={ network + "-social-button"} url={url} text={text} network={networks[network] } size={ size } />)
			}
		}

		return (
			<div className="generator">
				<h2 style={ { display: "none" } }>Generator</h2>
				<div className="generator__options">
					<form className="generator__form">
						<label>
							<h3>URL</h3>
							<input name="url" type="url" className="generator__url" placeholder="http://mxstbr.com" onChange={this._setURL} />
						</label>
						<label >
							<h3>Text</h3>
							<textarea name="text" className="generator__text" placeholder="Quickly generate responsible social sharing buttons." onChange={this._setText}/>
						</label>
					</form>
					<h3>Social Networks</h3>
					<div className="generator__networks">
						{ networkButtons }
					</div>
					<h3>Size</h3>
					<div className="generator__sizes">
						{ sizeOptions }
					</div>
				</div>
				<div className="generator__buttons">
					<h3>Preview</h3>
					{ socialButtons }
				</div>
				<hr />
				<Code url={url} text={text} networks={networks} size={size} />
			</div>
		);
	},
	_setURL: function(evt) {
		AppActions.setURL(evt.target.value);
	},
	_setText: function(evt) {
		AppActions.setText(evt.target.value);
	}
});

module.exports = Generator;