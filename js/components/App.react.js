var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Generator = require('./Generator.react');
var Footer = require('./Footer.react');

var App = React.createClass({
	// Get the data when the component is first created and save it to this.state
	getInitialState: function() {
		return AppStore.getData();
	},
	componentDidMount: function() {
		// Analytics
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackEvent', 'page', 'visible']);
		// Fade the website in
		var $elem = $(this.getDOMNode());
		$elem.css("opacity", "0");
		setTimeout(function() {
			$elem.css("transition", "opacity 250ms");
			$elem.css("opacity", "1");
			// And the loading spinner out
			$('.spinner-wrapper').css("transition", "opacity 250ms");
			$('.spinner-wrapper').css("opacity", "0");
			setTimeout(function() {
				$('.spinner-wrapper').css("display", "none");
			}, 250);
		}, 0);
		AppStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},
	render: function() {
		// Render the basic layout and the Generator, found at js/components/Generator.react.js
		return (
			<div>
				<a href="http://twitter.com/mxstbr" onClick={ function() {_gaq.push(['_trackEvent', 'logo', 'click'])} }>
					<h1 className="logo">&lt;mxstbr/&gt;</h1>
				</a>
				<div className="header">
					<h1 className="header__title">sharingbuttons.io</h1>
					<h2 className="header__tagline">Super fast and easy Social Media Sharing Buttons. No JavaScript. No tracking.</h2>
				</div>
				<div className="app__wrapper">
					<Generator data={this.state} />
					<div className="grid-50">
						<h2>Why?</h2>
						<p>Default social media sharing scripts are big, often download multiple files and track users across the web. This generator outputs social media sharing buttons that do not use JavaScript, which means they are incredibly fast, only use a single HTTP request and they do not track the user. (Also, they look quite nice.)</p>
					</div>
					<div className="grid-50">
						<h2>How?</h2>
						<p>Simply enter the URL and text you want to share, the social networks you want to include and choose one of the sizes. Then you only have to copy and paste the code generated below into your <code>.html</code> file.</p>
						<p>The buttons are sized using <code>em</code> units, so if they are too big on your site simply change the <code>font-size</code> property of the <code>.resp-sharing-button</code> class to a smaller percentage, e.g. 80%.</p>
					</div>
					<Footer />
				</div>
			</div>
		);
	},
	// If the data changes, get the new data and rerender if something changed
	_onChange: function() {
	    this.setState(AppStore.getData());
	}
});

module.exports = App;