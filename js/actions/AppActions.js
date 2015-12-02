var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	/**
	 * Toggles a social network on/off
	 * @param  {string} name - The name of the social network to be toggled
	 */
	toggleNetwork: function(name) {
		AppDispatcher.handleAction({
			actionType: AppConstants.TOGGLE_NETWORK,
			name: name
		});
	},
	/**
	 * Sets the shared URL
	 * @param {string} url - The url to be shared
	 */
	setURL: function(url) {
		AppDispatcher.handleAction({
			actionType: AppConstants.SET_URL,
			url: url
		});
	},
	/**
	 * Sets the shared text
	 * @param {string} text - The text to be shared
	 */
	setText: function(text) {
		AppDispatcher.handleAction({
			actionType: AppConstants.SET_TEXT,
			text: text
		});
	},
	/**
	 * Changes the size of the buttons
	 * @param  {string} size - The size of the buttons. Has to be "small", "medium" or "large"
	 */
	changeSize: function(size) {
		AppDispatcher.handleAction({
			actionType: AppConstants.CHANGE_SIZE,
			size: size
		});
	},
	/**
	 * Toggles the icon type
	 * @param  {string} type - THe type of icon used. Has to be "circle" or "solid"
	 */
	toggleIcon: function(type) {
		AppDispatcher.handleAction({
			actionType: AppConstants.TOGGLE_ICON,
			type: type
		});
	}
};

module.exports = AppActions;
