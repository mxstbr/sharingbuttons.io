var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActions = require('../actions/AppActions');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

_data = {
	"url": "http://sharing.mxstbr.com",
	"text": "Quickly generate responsible social sharing buttons.",
	"style": ".resp-sharing-button {\ndisplay: inline-block;\nborder-radius: 5px;\nborder-width: 1px;\nborder-style: solid;\ntransition: background-color 125ms ease-out, border-color 125ms ease-out, opacity 250ms ease-out;\nmargin: 0.5em;\npadding: 0.5em 0.75em;\nfont-family: 'Source Sans Pro', sans-serif; }\n.resp-sharing-button a {\n  text-decoration: none;\n  color: #FFF;\n  display: block; }\n.resp-sharing-button--large .resp-sharing-button__icon {\n  padding-right: 0.4em; }\n.resp-sharing-button__icon {\n  width: 1em;\n  height: 1em;\n  margin-bottom: -0.1em; }\n.resp-sharing-button__link {\n  text-decoration: none;\n  color: #FFF; }",
	"sizes": {
		"small": false,
		"medium": false,
		"large": true
	},
	"networks": {
		'facebook': {
			'visible': true,
			'name': 'Facebook',
			'img': '<svg class="resp-sharing-button__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">\n<path fill="#FFF" d="M26.667 0h-21.334c-2.945 0-5.333 2.388-5.333 5.334v21.332c0 2.946 2.387 5.334 5.333 5.334h10.667v-14h-4v-4h4v-3c0-2.761 2.239-5 5-5h5v4h-5c-0.552 0-1 0.448-1 1v3h5.5l-1 4h-4.5v14h6.667c2.945 0 5.333-2.388 5.333-5.334v-21.332c0-2.946-2.387-5.334-5.333-5.334z"></path>\n</svg>',
			'style': '.resp-sharing-button--facebook {\nbackground-color: #3b5998;\nborder-color: #3b5998; }\n.resp-sharing-button--facebook:hover,\n.resp-sharing-button--facebook:active {\n  background-color: #2d4373;\n  border-color: #2d4373; }',
			'scriptSize': 73.3,
			'requests': 3
		},
		'twitter': {
			'visible': true,
			'name': 'Twitter',
			'img': '<svg class="resp-sharing-button__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">\n<path fill="#FFF" d="M26.667 0h-21.333c-2.934 0-5.334 2.4-5.334 5.334v21.332c0 2.936 2.4 5.334 5.334 5.334h21.333c2.934 0 5.333-2.398 5.333-5.334v-21.332c0-2.934-2.399-5.334-5.333-5.334zM23.952 11.921c0.008 0.176 0.012 0.353 0.012 0.531 0 5.422-4.127 11.675-11.675 11.675-2.317 0-4.474-0.679-6.29-1.844 0.321 0.038 0.648 0.058 0.979 0.058 1.922 0 3.692-0.656 5.096-1.757-1.796-0.033-3.311-1.219-3.833-2.849 0.251 0.048 0.508 0.074 0.772 0.074 0.374 0 0.737-0.050 1.081-0.144-1.877-0.377-3.291-2.035-3.291-4.023 0-0.017 0-0.034 0-0.052 0.553 0.307 1.186 0.492 1.858 0.513-1.101-0.736-1.825-1.992-1.825-3.415 0-0.752 0.202-1.457 0.556-2.063 2.024 2.482 5.047 4.116 8.457 4.287-0.070-0.3-0.106-0.614-0.106-0.935 0-2.266 1.837-4.103 4.103-4.103 1.18 0 2.247 0.498 2.995 1.296 0.935-0.184 1.813-0.525 2.606-0.996-0.306 0.958-0.957 1.762-1.804 2.27 0.83-0.099 1.621-0.32 2.357-0.646-0.55 0.823-1.245 1.545-2.047 2.124z"></path>\n</svg>',
			'style': '.resp-sharing-button--twitter {\nbackground-color: #55acee;\nborder-color: #55acee; }\n.resp-sharing-button--twitter:hover,\n.resp-sharing-button--twitter:active {\n  background-color: #2795e9;\n  border-color: #2795e9; }',
			'scriptSize': 52.7,
			'requests': 4
		},
		'google': {
			'visible': true,
			'name': 'Google+',
			'img': '<svg class="resp-sharing-button__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">\n<path fill="#FFF" d="M0.025 27.177c-0.008-0.079-0.014-0.158-0.018-0.238 0.004 0.080 0.011 0.159 0.018 0.238zM7.372 17.661c2.875 0.086 4.804-2.897 4.308-6.662s-3.231-6.787-6.106-6.873c-2.876-0.085-4.804 2.796-4.308 6.562 0.496 3.765 3.23 6.887 6.106 6.973zM32 8v-2.666c0-2.934-2.399-5.334-5.333-5.334h-21.333c-2.884 0-5.25 2.32-5.33 5.185 1.824-1.606 4.354-2.947 6.965-2.947 2.791 0 11.164 0 11.164 0l-2.498 2.113h-3.54c2.348 0.9 3.599 3.629 3.599 6.429 0 2.351-1.307 4.374-3.153 5.812-1.801 1.403-2.143 1.991-2.143 3.184 0 1.018 1.93 2.75 2.938 3.462 2.949 2.079 3.904 4.010 3.904 7.233 0 0.513-0.064 1.026-0.19 1.53h9.617c2.934 0 5.333-2.398 5.333-5.334v-16.666h-6v6h-2v-6h-6v-2h6v-6h2v6h6zM5.809 23.936c0.675 0 1.294-0.018 1.936-0.018-0.848-0.823-1.52-1.831-1.52-3.074 0-0.738 0.236-1.448 0.567-2.079-0.337 0.024-0.681 0.031-1.035 0.031-2.324 0-4.297-0.752-5.756-1.995v2.101l0 6.304c1.67-0.793 3.653-1.269 5.809-1.269zM0.107 27.727c-0.035-0.171-0.061-0.344-0.079-0.52 0.018 0.176 0.045 0.349 0.079 0.52zM14.233 29.776c-0.471-1.838-2.139-2.749-4.465-4.361-0.846-0.273-1.778-0.434-2.778-0.444-2.801-0.030-5.41 1.092-6.882 2.762 0.498 2.428 2.657 4.267 5.226 4.267h8.951c0.057-0.348 0.084-0.707 0.084-1.076 0-0.392-0.048-0.775-0.137-1.148z"></path>\n</svg>',
			'style': '.resp-sharing-button--google {\nbackground-color: #dd4b39;\nborder-color: #dd4b39; }\n.resp-sharing-button--google:hover,\n.resp-sharing-button--google:active {\n  background-color: #c23321;\n  border-color: #c23321; }',
			'scriptSize': 15.1,
			'requests': 1
		},
		'tumblr': {
			'visible': true,
			'name': 'Tumblr',
			'img': '<svg class="resp-sharing-button__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32"><path fill="#FFFFFF" d="M26.668 0h-21.334c-2.934 0-5.334 2.4-5.334 5.334v21.332c0 2.936 2.4 5.334 5.334 5.334h21.334c2.933 0 5.332-2.398 5.332-5.334v-21.332c-0-2.933-2.399-5.334-5.332-5.334zM22.866 25.771c-0.942 0.443-1.798 0.756-2.563 0.936-0.765 0.178-1.593 0.267-2.481 0.267-1.010 0-1.605-0.127-2.381-0.381-0.775-0.256-1.438-0.621-1.984-1.090-0.549-0.473-0.928-0.975-1.14-1.506s-0.317-1.303-0.317-2.313v-7.744h-3v-3.127c0.867-0.281 1.873-0.685 2.49-1.211 0.62-0.527 1.116-1.158 1.49-1.896 0.375-0.736 0.633-1.676 0.774-2.815h3.141v5.108h5.105v3.941h-5.106v5.662c0 1.281-0.017 2.020 0.119 2.383 0.135 0.361 0.473 0.736 0.841 0.953 0.489 0.293 1.047 0.439 1.676 0.439 1.118 0 2.231-0.363 3.336-1.090v3.482z"></path></svg>',
			'style': '.resp-sharing-button--tumblr {\nbackground-color: #35465C;\nborder-color: #35465C; }\n.resp-sharing-button--tumblr:hover,\n.resp-sharing-button--tumblr:active {\n  background-color: #222d3c;\n  border-color: #222d3c; }',
			'scriptSize': 11.6,
			'requests': 1
		},
		'pinterest': {
			'visible': true,
			'name': 'Pinterest',
			'img': '<svg class="resp-sharing-button__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">\n<path fill="#FFF" d="M26.667 0h-21.334c-2.945 0-5.333 2.388-5.333 5.334v21.332c0 2.946 2.387 5.334 5.333 5.334h21.334c2.945 0 5.333-2.388 5.333-5.334v-21.332c0-2.946-2.387-5.334-5.333-5.334zM17.915 25.126c-1.621 0-3.145-0.842-3.667-1.837 0 0-0.802 3.055-0.997 3.803-0.361 1.39-1.336 3.132-1.989 4.195l-1.093-0.387c-0.14-1.266-0.266-3.208 0.055-4.59 0.291-1.249 1.876-7.953 1.876-7.953s-0.479-0.958-0.479-2.375c0-2.225 1.29-3.886 2.895-3.886 1.365 0 2.025 1.025 2.025 2.254 0 1.373-0.874 3.425-1.325 5.327-0.377 1.593 0.799 2.892 2.369 2.892 2.844 0 5.030-2.999 5.030-7.327 0-3.831-2.753-6.509-6.683-6.509-4.552 0-7.225 3.415-7.225 6.943 0 1.375 0.53 2.85 1.191 3.651 0.131 0.158 0.15 0.297 0.111 0.459-0.121 0.506-0.391 1.593-0.444 1.815-0.070 0.293-0.232 0.355-0.535 0.214-1.998-0.93-3.248-3.852-3.248-6.198 0-5.047 3.667-9.682 10.572-9.682 5.55 0 9.864 3.955 9.864 9.241 0 5.514-3.477 9.952-8.302 9.952z"></path>\n</svg>',
			'style': '.resp-sharing-button--pinterest {\nbackground-color: #cc2127;\nborder-color: #cc2127; }\n.resp-sharing-button--pinterest:hover,\n.resp-sharing-button--pinterest:active {\n  background-color: #a01a1f;\n  border-color: #a01a1f; }',
			'scriptSize': 12.9,
			'requests': 3
		},
		'linkedin': {
			'visible': true,
			'name': 'Linkedin',
			'img': '<svg class="resp-sharing-button__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">\n<path fill="#FFF" d="M26.625 0h-21.25c-2.956 0-5.375 2.419-5.375 5.375v21.25c0 2.956 2.419 5.375 5.375 5.375h21.25c2.956 0 5.375-2.419 5.375-5.375v-21.25c0-2.956-2.419-5.375-5.375-5.375zM12 26h-4v-14h4v14zM10 10c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM26 26h-4v-8c0-1.105-0.895-2-2-2s-2 0.895-2 2v8h-4v-14h4v2.483c0.825-1.133 2.086-2.483 3.5-2.483 2.485 0 4.5 2.239 4.5 5v9z"></path>\n</svg>',
			'style': '.resp-sharing-button--linkedin {\nbackground-color: #0976b4;\nborder-color: #0976b4; }\n.resp-sharing-button--linkedin:hover,\n.resp-sharing-button--linkedin:active {\n  background-color: #075683;\n  border-color: #075683; }',
			'scriptSize': 47.7,
			'requests': 2
		},
		'reddit': {
			'visible': false,
			'name': 'Reddit',
			'img': '<svg class="resp-sharing-button__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">\n<path fill="#FFF" d="M8 20c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM20 20c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM20.097 24.274c0.515-0.406 1.262-0.317 1.668 0.198s0.317 1.262-0.198 1.668c-1.434 1.13-3.619 1.86-5.567 1.86s-4.133-0.73-5.567-1.86c-0.515-0.406-0.604-1.153-0.198-1.668s1.153-0.604 1.668-0.198c0.826 0.651 2.46 1.351 4.097 1.351s3.271-0.7 4.097-1.351zM32 16c0-2.209-1.791-4-4-4-1.504 0-2.812 0.83-3.495 2.057-2.056-1.125-4.561-1.851-7.29-2.019l2.387-5.36 4.569 1.319c0.411 1.167 1.522 2.004 2.83 2.004 1.657 0 3-1.343 3-3s-1.343-3-3-3c-1.142 0-2.136 0.639-2.642 1.579l-5.091-1.47c-0.57-0.164-1.173 0.116-1.414 0.658l-3.243 7.282c-2.661 0.187-5.102 0.907-7.114 2.007-0.683-1.227-1.993-2.056-3.496-2.056-2.209 0-4 1.791-4 4 0 1.635 0.981 3.039 2.387 3.659-0.252 0.751-0.387 1.535-0.387 2.341 0 5.523 6.268 10 14 10s14-4.477 14-10c0-0.806-0.134-1.589-0.387-2.34 1.405-0.62 2.387-2.025 2.387-3.66zM27 5.875c0.621 0 1.125 0.504 1.125 1.125s-0.504 1.125-1.125 1.125-1.125-0.504-1.125-1.125 0.504-1.125 1.125-1.125zM2 16c0-1.103 0.897-2 2-2 0.797 0 1.487 0.469 1.808 1.145-1.045 0.793-1.911 1.707-2.552 2.711-0.735-0.296-1.256-1.016-1.256-1.856zM16 29.625c-6.42 0-11.625-3.414-11.625-7.625s5.205-7.625 11.625-7.625c6.42 0 11.625 3.414 11.625 7.625s-5.205 7.625-11.625 7.625zM28.744 17.856c-0.641-1.003-1.507-1.918-2.552-2.711 0.321-0.676 1.011-1.145 1.808-1.145 1.103 0 2 0.897 2 2 0 0.84-0.52 1.56-1.256 1.856z"></path>\n</svg>',
			'style': '.resp-sharing-button--reddit {\nbackground-color: #5f99cf;\nborder-color: #5f99cf; }\n.resp-sharing-button--reddit:hover,\n.resp-sharing-button--reddit:active {\n  background-color: #3a80c1;\n  border-color: #3a80c1; }',
			'scriptSize': 0.2,
			'requests': 0
		}
	}
}

var AppStore = _.extend({}, EventEmitter.prototype, {
	getData: function() {
		this._updateLinks();
		return _data;
	},
	_toggleNetwork: function(name) {
		_data.networks[name].visible = !_data.networks[name].visible;
		_gaq.push(['_trackEvent', 'network', name, _data.networks[name].visible]);
		AppStore.emitChange();
	},
	_setURL: function(url) {
		_data.url = url;
		this._updateLinks();
	},
	_setText: function(text) {
		_data.text = text;
		this._updateLinks();
	},
	_changeSize: function(size) {
		var sizes = _data.sizes;

		for (var option in sizes) {
			if (sizes[option] === true) {
				sizes[option] = false;
			}
		}
		_gaq.push(['_trackEvent', 'size', size]);
		sizes[size] = true;
	},
	_updateLinks: function() {
		var text = encodeURIComponent(_data.text);
		var url = encodeURIComponent(_data.url);

		var links = {
			'facebook': 'https://facebook.com/sharer/sharer.php?u=' + url,
			'twitter': 'https://twitter.com/intent/tweet/?text=' + text + '&url=' + url,
			'google': 'https://plus.google.com/share?url=' + url,
			'tumblr': "https://www.tumblr.com/widgets/share/tool?posttype=link&content=" + url + "&title=" + text + "&caption=" + text,
			'pinterest': 'https://pinterest.com/pin/create/button/?url=' + url + '&summary=' + text,
			'linkedin': 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&summary=' + text,
			'reddit': 'https://reddit.com/submit/?url=' + url
		}

		for (network in _data.networks) {
			_data.networks[network].link = links[network];
		}

		return true;
	},
	emitChange: function() {
		this.emit('change');
	},
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case AppConstants.TOGGLE_NETWORK:
			AppStore._toggleNetwork(action.name);
			break;
		case AppConstants.SET_URL:
			AppStore._setURL(action.url);
			break;
		case AppConstants.SET_TEXT:
			AppStore._setText(action.text);
			break;
		case AppConstants.CHANGE_SIZE:
			AppStore._changeSize(action.size);
			break;
		default:
			return false;
	}
	AppStore.emitChange();
	return true;
});

module.exports = AppStore;