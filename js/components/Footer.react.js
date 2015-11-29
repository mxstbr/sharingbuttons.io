var Footer = React.createClass({
	render: function() {
		// Render the footer
		return (
			<div className="footer">
				<div className="grid-50">
					<h2>Why?</h2>
					<p>Default social media sharing scripts are big, often download multiple files and track users across the web. This generator outputs social media sharing buttons that do not use JavaScript, which means they are incredibly fast, only use a single HTTP request and they do not track the user. (Also, they look quite nice.)</p>
				</div>
				<div className="grid-50">
					<h2>How?</h2>
					<p>Simply enter the URL and text you want to share, the social networks you want to include and choose one of the sizes. Then you only have to copy and paste the code generated below into your <code>.html</code> file.</p>
					<p>The buttons are sized using <code>em</code> units, so if they are too big on your site simply change the <code>font-size</code> property of the <code>.resp-sharing-button</code> class to a smaller percentage, e.g. 80%.</p>
				</div>
				<p>Contribute to this project on <a href="https://github.com/mxstbr/sharing">GitHub</a>. Inspired by Jonathan Suhs article “<a href="https://jonsuh.com/blog/social-share-links/">Responsible Social Share Links</a>”.</p>
				<p>Follow me on Twitter: <a href="https://twitter.com/mxstbr">@mxstbr</a></p>
			</div>
		);
	}
});

module.exports = Footer;
