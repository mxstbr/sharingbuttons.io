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
				<a href="http://twitter.com/mxstbr">
					<h1 className="logo">&lt;mxstbr/&gt;</h1>
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
	}
});

module.exports = App;
