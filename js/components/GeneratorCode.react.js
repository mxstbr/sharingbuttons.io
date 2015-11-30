var prism = require('../vendor/prism');

var Code = React.createClass({
	componentDidMount: function() {
		this.html = document.querySelector('.code__html');
		this.css = document.querySelector('.code__css');
		this.kilobytesSavedElem = document.getElementById('kilobytes-saved');
		this.requestsSavedElem = document.getElementById('requests-saved');
		this.componentDidUpdate();
	},
	componentDidUpdate: function() {
		var kilobytesNormally = 0; // See https://jonsuh.com/blog/social-share-links/, Google+, Facebook, Linkedin, Pinterest then Twitter
		var savedRequests = 0;
		// Piece together the code to be copied and calculate the savings
		for (var network in this.props.networks) {
			if (this.props.networks[network].visible === true) {
				kilobytesNormally += this.props.networks[network].scriptSize;
				savedRequests += this.props.networks[network].requests;
			}
		}
		// Calculate the saved kB
		var savedKilobytes = parseFloat(kilobytesNormally - (this._getByteCount(this.props.HTMLForButtons) + this._getByteCount(this.props.CSSForButtons)) / 1000).toFixed(2);
		savedKilobytes = this._keepNumberInPositive(savedKilobytes);
		savedRequests = this._keepNumberInPositive(savedRequests);
		this.kilobytesSavedElem.textContent = savedKilobytes;
		this.requestsSavedElem.textContent = savedRequests;
		prism.highlightElement(this.html);
		prism.highlightElement(this.css);
	},
	render: function() {
		// Render code block in Generator
		return (
			<div className="generator__code">
				<pre className="generator__code-wrapper" onClick={this._selectHTML}>
					<code className="generator__code-field code__html language-markup" >
						{ this.props.HTMLForButtons }
					</code>
				</pre>
				<pre className="generator__code-wrapper" onClick={this._selectCSS}>
					<code className="generator__code-field code__css language-css" >
						{ this.props.CSSForButtons }
					</code>
				</pre>
				<h3 className="generator__code-stats">You are saving ~<em><span id="kilobytes-saved"></span> Kilobytes</em> and <em><span id="requests-saved"></span> HTTP Requests</em>!</h3>
			</div>
		);
	},
	_selectCSS: function() {
		var elem = document.querySelector('.code__css');
		this._selectTextInElement(elem);
	},
	// Select the HTML
	_selectHTML: function() {
		var elem = document.querySelector('.code__html');
		this._selectTextInElement(elem);
	},
	_selectTextInElement: function(text) {
	  var doc = document;
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
	},
	// Checks that number is positive
	_keepNumberInPositive: function(num) {
		return (num <= 0) ? 0 : num;
	}
});

module.exports = Code;
