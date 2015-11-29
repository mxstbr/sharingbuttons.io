var Code = React.createClass({
	componentDidMount: function() {
		this.componentDidUpdate();
	},
	componentDidUpdate: function() {
		var $html = $('.code__html');
		var $css = $('.code__css');
		var kilobytesNormally = 0; // See https://jonsuh.com/blog/social-share-links/, Google+, Facebook, Linkedin, Pinterest then Twitter
		var savedRequests = 0;
		var HTMLCode = this.props.HTMLForButtons;
		var CSSCode = this.props.CSSForButtons;
		var networks = this.props.networks;

		// Piece together the code to be copied and calculate the savings
		for (var network in networks) {
			if (networks[network].visible === true) {
				kilobytesNormally += networks[network].scriptSize;
				savedRequests += networks[network].requests;
			}
		}

		// Calculate the saved kB
		var savedKilobytes = parseFloat(kilobytesNormally - (this._getByteCount(HTMLCode) + this._getByteCount(CSSCode)) / 1000).toFixed(2);
		$('#kilobytes-saved').text(savedKilobytes);
		$('#requests-saved').text(savedRequests);
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
						{ this.props.HTMLForButtons }
					</code>
				</pre>
				<pre className="generator__code-wrapper" onClick={this._selectCSS}>
					<code className="generator__code-field code__css" >
						{ this.props.CSSForButtons }
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
