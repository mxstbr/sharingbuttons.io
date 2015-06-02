var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	toggleNetwork: function(name) {
		AppDispatcher.handleAction({
			actionType: AppConstants.TOGGLE_NETWORK,
			name: name
		});
	},
	setURL: function(url) {
		AppDispatcher.handleAction({
			actionType: AppConstants.SET_URL,
			url: url
		});
	},
	setText: function(text) {
		AppDispatcher.handleAction({
			actionType: AppConstants.SET_TEXT,
			text: text
		});
	},
	changeSize: function(size) {
		AppDispatcher.handleAction({
			actionType: AppConstants.CHANGE_SIZE,
			size: size
		});
	},
	changeIcon: function(icon) {
		AppDispatcher.handleAction({
			actionType: AppConstants.CHANGE_ICON,
			icon: icon
		});
	}
};

module.exports = AppActions;