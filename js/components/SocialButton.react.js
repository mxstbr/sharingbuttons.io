var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var InlineSvg = require('react-inlinesvg');

var SocialButton = React.createClass({
	componentDidMount: function() {
	},
	render: function() {
		var network = this.props.network;
		var name = network.name;
		var text = this.props.text;
		var url = this.props.url;
		var id = this.props.id;
		var shareText;
		var href;
		var button = [];
		var img = [];

		switch(this.props.size) {
			case "small":
				shareText = "";
				var source = '/img/svg/' + id.toLowerCase() + '.svg';
				img.push(<InlineSvg key={ id + '-button__img' } src={ source } className="resp-sharing-button__icon"/>);
				break;
			case "medium":
				shareText = "Share on " + name;
				break;
			case "large":
				shareText = "Share on " + name;
				var source = '/img/svg/' + id.toLowerCase() + '.svg';
				img.push(<InlineSvg key={ id + '-button__img' } src={ source } className="resp-sharing-button__icon"/>);
				break;
		}

		return (
			<div className="resp-sharing-button__wrapper">
				<a className="resp-sharing-button__link"
				   key={ name + "share-link" }
				   href={ network.link }
				   target="_blank">
					<div key={ name + "share-button"} className={ "resp-sharing-button resp-sharing-button--" + id.toLowerCase() + " resp-sharing-button--" + this.props.size}>
						{ img }{ shareText }
					</div>
				</a>
			</div>
		);
	}
});

module.exports = SocialButton;