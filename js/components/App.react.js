var AppStore = require('../stores/AppStore');
var Generator = require('./Generator.react');
var Footer = require('./Footer.react');
var Header = require('./Header.react');

var App = React.createClass({
	// Get the data when the component is first created and save it to this.state
	getInitialState: function() {
		return AppStore.getData();
	},
	componentDidMount: function() {
		// Fade the website in
		this._fadeInApp();
		AppStore.addChangeListener(this._onChange);
		this._initAnalytics();
	},
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},
	render: function() {
		// Render the basic layout and the Generator, found at js/components/Generator.react.js
		return (
			<div>
				<a href="http://twitter.com/mxstbr" target="_blank">
					<h1 className="logo">&lt;mxstbr/&gt;</h1>
				</a>
				<a href="https://github.com/mxstbr/sharing" target="_blank">
					<svg width="80" height="80" viewBox="0 0 250 250" className="github-corner">
					  <path className="github-corner__bg" d="M0 0l115 115h15l12 27 108 108V0z" />
					  <path className="octo-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" />
					  <path className="octo-body" d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"/>
					</svg>
				</a>
				<Header />
				<div className="app__wrapper">
					<Generator data={this.state} />
					<Footer />
				</div>
			</div>
		);
	},
	// If the data changes, get the new data and rerender if something changed
	_onChange: function() {
	    this.setState(AppStore.getData());
	},
	_fadeInApp: function() {
		var elem = this.getDOMNode();
		var spinnerWrapper = document.querySelector('.spinner-wrapper');
		elem.style.opacity = 0;
		setTimeout(function() {
			elem.style.transition = "opacity 250ms";
			elem.style.opacity = 1;
			// And the loading spinner out
			spinnerWrapper.style.transition = "opacity 250ms";
			spinnerWrapper.style.opacity = 0;
			setTimeout(function() {
				spinnerWrapper.style.display = "none";
			}, 250);
		}, 0);
	},
	_initAnalytics: function() {
	}
});

module.exports = App;
