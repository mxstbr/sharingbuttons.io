var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Code = React.createClass({
	componentDidMount: function() {
		// Select the text on-click
		var $elem = $(this.getDOMNode());
		$elem.children().click(this._selectText);
		this.componentDidUpdate();
	},
	componentDidUpdate: function() {
		var text = this.props.text;
		var url = this.props.url;
		var networks = this.props.networks;
		var style = '<style>\n' + this.props.style;
		var icon = this.props.icon;
		var $html = $('.code__html');
		var kilobytesNormally = 0; // See https://jonsuh.com/blog/social-share-links/, Google+, Facebook, Linkedin, Pinterest then Twitter
		var savedRequests = 0;
		var code = "";

		// Piece together the code to be copied and calculate the savings
		for (network in networks) {
			if (networks[network].visible === true) {
				kilobytesNormally += networks[network].scriptSize;
				savedRequests += networks[network].requests;
				code += '<a class="resp-sharing-button__link" href="'
				code += networks[network].link;
				code += '" target="_blank">';
				code += '<div class="resp-sharing-button resp-sharing-button--' + network.toLowerCase() + ' resp-sharing-button--' + this.props.size + '">\n    ';
				// Adjust the code based on the button size
				switch(this.props.size) {
					case "small":
						shareText = '<div class="resp-sharing-button__icon">' + networks[network].icons[icon] + '</div>';
						break;
					case "medium":
						shareText = "Share on " + networks[network].name;
						break;
					case "large":
						shareText = '<div class="resp-sharing-button__icon">' + networks[network].icons[icon] + '</div>' + "Share on " + networks[network].name;
						break;
				}
				code += shareText + '\n</div>\n';
				code += '</a>\n';
				style += '\n';
				style += networks[network].style;
			}
		}

		code += style;
		code += "\n</style>";

		// Calculate the saved kB
		var savedKilobytes = parseFloat(kilobytesNormally - this._getByteCount(code) / 1000).toFixed(2);
		$('#kilobytes-saved').text(savedKilobytes);
		$('#requests-saved').text(savedRequests);
		// Change the code block
		$html.text(code);
		// Highlight the code
		hljs.highlightBlock($html[0]);
	},
	render: function() {
		// Render code block in Generator
		return (
			<div>
				<h3 className="generator__code-heading">Code</h3>
				<div className="generator__code">
					<pre onClick={this._selectText}>
						<code className="code__html" >
						</code>
					</pre>
				</div>
				<h3 className="generator__stats">You are saving ~<em><span id="kilobytes-saved"></span> Kilobytes</em> and <em><span id="requests-saved"></span> HTTP Requests</em>!</h3>
			</div>
		);
	},
	// Select the code on click
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
	// Gets the length of a string in bytes
	_getByteCount: function(string) {
	    return encodeURI(string).split(/%..|./).length - 1;
	}
});

module.exports = Code;