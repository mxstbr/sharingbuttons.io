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
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackEvent', 'page', 'visible']);
		var $elem = $(this.getDOMNode());

		$elem.css("opacity", "0");
		setTimeout(function() {
			$elem.css("transition", "opacity 250ms");
			$elem.css("opacity", "1");
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
		return (
			<div>
				<a href="http://mxstbr.com" onClick={ function() {_gaq.push(['_trackEvent', 'logo', 'click'])} }>
					<h1 className="logo">&lt;mxstbr/&gt;</h1>
				</a>
				<div className="header">
					<h1 className="header__title">Responsible Social Sharing Buttons</h1>
					<h2 className="header__tagline">Quickly generate social sharing buttons with a tiny performance footprint.</h2>
				</div>
				<div className="app__wrapper">
					<Generator data={this.state} />
					<div className="grid-50">
						<h2>Why?</h2>
						<p>Including default sharing scripts from multiple social networks quickly adds a lot of overhead to your website — not to mention the horrible practice of tracking users across the web.</p>
						<p>Inspired by Jonathan Suhs article “<a href="https://jonsuh.com/blog/social-share-links/">Responsible Social Share Links</a>”, I built this web app to quickly generate social share buttons with a tiny performance footprint.</p>
					</div>
					<div className="grid-50">
						<h2>How?</h2>
						<p>Simply enter the URL and text you want to share, the social networks you want to include and choose one of the sizes. Then you only have to copy and paste the code generated below into your <code>.html</code> file.</p>
						<p>The buttons are sized using <code>em</code> units, so if they are too big on your site, change the <code>font-size</code> property of the <code>.resp-sharing-button</code> class to a smaller percentage, e.g. 80%.</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	},
	// If the data changes, get the new data and rerender if something changed
	_onChange: function() {
	    this.setState(AppStore.getData());
	}
});

module.exports = App;