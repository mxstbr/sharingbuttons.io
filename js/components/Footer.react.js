var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Footer = React.createClass({
	render: function() {
		// Render the footer
		return (
			<div className="footer">
				<p>Contribute to this project on <a href="https://github.com/mxstbr/sharing">GitHub</a>. Inspired by Jonathan Suhs article “<a href="https://jonsuh.com/blog/social-share-links/">Responsible Social Share Links</a>”.</p>
				<p>Follow me on Twitter: <a href="https://twitter.com/mxstbr">@mxstbr</a></p>
			</div>
		);
	}
});

module.exports = Footer;