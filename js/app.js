window.React = require('react');
var App = require('./components/App.react');
var css = require('./../css/app.css');
require('../img/social_media.png');

React.initializeTouchEvents(true);

// Render the app component (js/components/App.react.js)
React.render(
	<App />,
	document.getElementById('app')
);
