// combine react & react-dom/server to emulate React 0.12.x
window.React = Object.assign(require('react'), require('react-dom/server'));
var App = require('./components/App.react');
var css = require('./../css/app.css');
require('../img/social_media.png');

// Render the app component (js/components/App.react.js)
React.render(
	<App />,
	document.getElementById('app')
);
