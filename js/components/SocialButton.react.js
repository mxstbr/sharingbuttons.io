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

		var shareText;
		var href;
		var button = [];
		var img = [];

		switch(this.props.size) {
			case "small":
				shareText = "";
				if (name === "Google+") {
					name = name.substr(0, name.length - 1);
				}
				var source = '/img/svg/' + name.toLowerCase() + '.svg';
				img.push(<img key={ name + '-button__img' } src={ source } className="resp-sharing-button__icon"/>);
				break;
			case "medium":
				shareText = "Share on " + name;
				break;
			case "large":
				shareText = "Share on " + name;
				if (name === "Google+") {
					name = name.substr(0, name.length - 1);
				}
				var source = '/img/svg/' + name.toLowerCase() + '.svg';
				img.push(<img key={ name + '-button__img' } src={ source } className="resp-sharing-button__icon"/>);
				break;
		}

		if (name === "Google+") {
			name = name.substr(0, name.length - 1);
		}

		switch (name) {
			case "Twitter":
				href = "https://twitter.com/intent/tweet/?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
				break;
			case "Pinterest":
				href = "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(url) + "&summary=" + encodeURIComponent(text);
				break;
			case "Facebook":
				href = "https://facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
				break;
			case "Reddit":
				href = "https://reddit.com/submit/?url=" + encodeURIComponent(url);
				break;
			case "Google":
				href = "https://plus.google.com/share?url=" + encodeURIComponent(url);
				break;
			case "Linkedin":
				href = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url) + "&summary=" + encodeURIComponent(text);
				break;
			case "Tumblr":
				href = "https://www.tumblr.com/widgets/share/tool?posttype=link&content=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(text) + "&caption=" + encodeURIComponent(text);
				break;
			default:
				href = "";
				break;
		}

		return (
			<div className="resp-sharing-button__wrapper">
				<a className="resp-sharing-button__link"
				   key={ name + "share-link" }
				   href={ href }
				   target="_blank">
					<div key={ name + "share-button"} className={ "resp-sharing-button resp-sharing-button--" + name.toLowerCase() + " resp-sharing-button--" + this.props.size}>
						{ img }{ shareText }
					</div>
				</a>
			</div>
		);
	}
});

module.exports = SocialButton;