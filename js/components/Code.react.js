var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Code = React.createClass({
	componentDidMount: function() {
		var $elem = $(this.getDOMNode());
		$elem.children().click(this._selectText);
		this.componentDidUpdate();
	},
	componentDidUpdate: function() {
		var text = this.props.text;
		var url = this.props.url;
		var networks = this.props.networks;
		var $html = $('.code__html');
		var kilobytesNormally = 0; // See https://jonsuh.com/blog/social-share-links/, Google+, Facebook, Linkedin, Pinterest then Twitter
		var savedRequests = 0;
		var code = "";
		var style = "<style>\n";
		style += ".resp-sharing-button {\ndisplay: inline-block;\nborder-radius: 5px;\nborder-width: 1px;\nborder-style: solid;\ntransition: background-color 125ms ease-out, border-color 125ms ease-out, opacity 250ms ease-out;\nmargin: 0.5em;\npadding: 0.5em 0.75em;\nfont-family: 'Source Sans Pro', sans-serif; }\n.resp-sharing-button a {\n  text-decoration: none;\n  color: #FFF;\n  display: block; }\n.resp-sharing-button--large .resp-sharing-button__icon {\n  padding-right: 0.4em; }\n.resp-sharing-button__icon {\n  width: 1em;\n  height: 1em;\n  margin-bottom: -0.1em; }\n.resp-sharing-button__link {\n  text-decoration: none;\n  color: #FFF; }";

		text = encodeURIComponent(text);
		url = encodeURIComponent(url);

		var networkLinks = {
			'facebook': {
				'link': 'https://facebook.com/sharer/sharer.php?u=' + url
			},
			'twitter': {
				'link': 'https://twitter.com/intent/tweet/?text=' + text + '&url=' + url
			},
			'google': {
				'link': 'https://plus.google.com/share?url=' + url
			},
			'reddit': {
				'link': 'https://reddit.com/submit/?url=' + url
			},
			'pinterest': {
				'link': 'https://pinterest.com/pin/create/button/?url=' + url + '&summary=' + text
			},
			'linkedin': {
				'link': 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&summary=' + text
			},
			'tumblr': {
				'link': "https://www.tumblr.com/widgets/share/tool?posttype=link&content=" + url + "&title=" + text + "&caption=" + text
			}
		}

		for (var network in networkLinks) {
			for (var innerNetwork in networks) {
				if (innerNetwork.replace(/^\s+|\s+$|\+/g,'').toLowerCase() === network) {
					if (networks[innerNetwork].visible === true) {
						kilobytesNormally += networks[innerNetwork].scriptSize;
						savedRequests += networks[innerNetwork].requests;
						code += '<a class="resp-sharing-button__link" href="'
						code += networkLinks[network].link;
						code += '" target="_blank">';
						code += '<div class="resp-sharing-button resp-sharing-button--' + network.toLowerCase() + ' resp-sharing-button--' + this.props.size + '">\n    ';
						switch(this.props.size) {
							case "small":
								shareText = networks[network].img;
								break;
							case "medium":
								shareText = "Share on " + networks[network].name;
								break;
							case "large":
								shareText = networks[network].img + "Share on " + networks[network].name;
								break;
						}
						code += shareText + '\n</div>\n';
						code += '</a>\n';
						style += '\n';
						style += networks[innerNetwork].style;
					}
				}
			}
		}

		code += style;
		code += "\n</style>";

		var savedKilobytes = parseFloat(kilobytesNormally - this._getByteCount(code) / 1000).toFixed(2);
		$('#kilobytes-saved').text(savedKilobytes);
		$('#requests-saved').text(savedRequests);
		$html.text(code);
		hljs.highlightBlock($html[0]);
	},
	render: function() {

		return (
			<div>
				<h3 className="generator__code-heading">Code</h3>
				<div className="generator__code">
					<pre onClick={this._selectText}>
						<code className="code__html" >
						</code>
					</pre>
				</div>
				<h3 className="generator__stats">You are saving ~<em><span id="kilobytes-saved"></span></em> Kilobytes and <em><span id="requests-saved"></span></em> HTTP Requests!</h3>
			</div>
		);
	},
	_selectText: function(evt) {
	    var doc = document;
	    var text = $(this.getDOMNode()).find("code")[0];

	    if (doc.body.createTextRange) { // ms
	        var range = doc.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if (window.getSelection) { // moz, opera, webkit
	        var selection = window.getSelection();
	        var range = doc.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	},
	_getByteCount: function(string) {
	    return encodeURI(string).split(/%..|./).length - 1;
	}
});

module.exports = Code;