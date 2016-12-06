var Footer = React.createClass({
	render: function() {
		// Render the footer
		return (
			<div className="footer">
				<div className="grid-row">
					<div className="grid-50">
						<p>Love or loathe them, sharing buttons will not go away for a while. The default social media sharing scripts provided by the networks themselves are big, often download multiple files and track users across the web.</p>
						<p>This generator outputs social media sharing buttons that <em>do not use JavaScript</em>, which means they <em>load incredibly fast</em> (they only use a single HTTP request), <em>don't block your website from rendering</em>, are <em>accessible</em> and <em>don't track the user</em>. (Also, they look nice and follow the brand guidelines where applicable!)</p>
					</div>
					<div className="grid-50">
						<p>Using these buttons is as easy as copying the HTML code into your <code>.html</code> files, and the CSS code into your <code>.css</code> file.</p>
						<p>{"The buttons are sized using <code>em</code> units, so the only step to change the size of the buttons is to set the <code>font-size</code> property of the <code>.resp-sharing-button</code> class. Seriously, that's it!"}</p>
					</div>
				</div>
				<div className="grid-row">
					<p>Contribute to this project on <a href="https://github.com/mxstbr/sharing">GitHub</a>. Icons by <a href="http://streamlineicons.com/">Streamline</a>.</p>
				</div>
			</div>
		);
	}
});

module.exports = Footer;
