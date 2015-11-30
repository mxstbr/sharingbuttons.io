var Footer = React.createClass({
	render: function() {
		// Render the footer
		return (
			<div className="footer">
				<div className="grid-row">
					<div className="grid-50">
						<p>Love or loathe them, sharing buttons will not go away for a while. The default social media sharing scripts provided by the networks themselves are big, often download multiple files and track users across the web.</p>
						<p>This generator outputs social media sharing buttons that <em>do not use JavaScript</em>, which means they <em>load incredibly fast</em> (they only use a single HTTP request), <em>don't block your website from rendering</em> and <em>do not track the user</em>. (Also, they look nice)</p>
					</div>
					<div className="grid-50">
						<p>Using these buttons is as easy as copying the HTML code into your <code>.html</code> files, and the CSS code into your <code>.css</code> file.</p>
						<p>The buttons are sized using <code>em</code> units, so to change the size you just have to set the <code>font-size</code> property of the <code>.resp-sharing-button</code> class.</p>
					</div>
				</div>
				<div className="grid-row">
					<p>Contribute to this project on <a href="https://github.com/mxstbr/sharing">Github</a>. Icons by <a href="https://icomoon.io/">IcoMoon</a>, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
				</div>
			</div>
		);
	}
});

module.exports = Footer;
