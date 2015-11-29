var Code = React.createClass({
	componentDidMount: function() {
		this.componentDidUpdate();
	},
	componentDidUpdate: function() {
		var text = this.props.text;
		var url = this.props.url;
		var networks = this.props.networks;
		var style = this.props.style;
		var icon = this.props.icon;
		var $html = $('.code__html');
		var $css = $('.code__css');
		var kilobytesNormally = 0; // See https://jonsuh.com/blog/social-share-links/, Google+, Facebook, Linkedin, Pinterest then Twitter
		var savedRequests = 0;
		var code = "";
		var shareText = "";

		// Piece together the code to be copied and calculate the savings
		for (var network in networks) {
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

		// Calculate the saved kB
		var savedKilobytes = parseFloat(kilobytesNormally - this._getByteCount(code) / 1000).toFixed(2);
		$('#kilobytes-saved').text(savedKilobytes);
		$('#requests-saved').text(savedRequests);
		// Change the code block
		$html.text(code);
		$css.text(style);
		// Highlight the code
		hljs.highlightBlock($html[0]);
		hljs.highlightBlock($css[0]);
	},
	render: function() {
		// Render code block in Generator
		return (
			<div className="generator__code">
				<pre className="generator__code-wrapper" onClick={this._selectHTML}>
					<code className="generator__code-field code__html" >
					</code>
				</pre>
				<pre className="generator__code-wrapper" onClick={this._selectCSS}>
					<code className="generator__code-field code__css" >
					</code>
				</pre>
				<h3 className="generator__code-stats">You are saving ~<em><span id="kilobytes-saved"></span> Kilobytes</em> and <em><span id="requests-saved"></span> HTTP Requests</em>!</h3>
			</div>
		);
	},
	_selectCSS: function() {
		var $elem = $('.code__css')[0];
		this._selectTextInElement($elem);
	},
	// Select the HTML
	_selectHTML: function() {
		var $elem = $('.code__html')[0];
		this._selectTextInElement($elem);
	},
	_selectTextInElement: function($text) {
	  var doc = document;
		if (doc.body.createTextRange) { // ms
				var range = doc.body.createTextRange();
				range.moveToElementText($text);
				range.select();
		} else if (window.getSelection) { // moz, opera, webkit
				var selection = window.getSelection();
				var range = doc.createRange();
				range.selectNodeContents($text);
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
