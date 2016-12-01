var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppActions = require('../actions/AppActions');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('react/lib/Object.assign');

/**
 * DATA
 */
var _data = {
	"url": "http://sharingbuttons.io",
	"text": "Super fast and easy Social Media Sharing Buttons. No JavaScript. No tracking.",
	"icons": {
		"solid": true,
		"circle": false
	},
	"generalStyling": ".resp-sharing-button__link,\n.resp-sharing-button__icon {\n  display: inline-block\n}\n\n.resp-sharing-button__link {\n  text-decoration: none;\n  color: #fff;\n  margin: 0.5em\n}\n\n.resp-sharing-button {\n  border-radius: 5px;\n  transition: 25ms ease-out;\n  padding: 0.5em 0.75em;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif\n}\n\n.resp-sharing-button__icon svg {\n  width: 1em;\n  height: 1em\n}\n\n.resp-sharing-button span {\n  padding-left: 0.4em\n}\n\n/* Non solid icons get a stroke */\n.resp-sharing-button__icon {\n  stroke: #fff;\n  fill: none\n}\n\n/* Solid icons get a fill */\n.resp-sharing-button__icon--solid,\n.resp-sharing-button__icon--solidcircle {\n  fill: #fff;\n  stroke: none\n}\n\n.resp-sharing-button--twitter {\n  background-color: #55acee\n}\n\n.resp-sharing-button--twitter:hover {\n  background-color: #2795e9\n}\n\n.resp-sharing-button--pinterest {\n  background-color: #bd081c\n}\n\n.resp-sharing-button--pinterest:hover {\n  background-color: #8c0615\n}\n\n.resp-sharing-button--facebook {\n  background-color: #3b5998\n}\n\n.resp-sharing-button--facebook:hover {\n  background-color: #2d4373\n}\n\n.resp-sharing-button--tumblr {\n  background-color: #35465C\n}\n\n.resp-sharing-button--tumblr:hover {\n  background-color: #222d3c\n}\n\n.resp-sharing-button--reddit {\n  background-color: #5f99cf\n}\n\n.resp-sharing-button--reddit:hover {\n  background-color: #3a80c1\n}\n\n.resp-sharing-button--google {\n  background-color: #dd4b39\n}\n\n.resp-sharing-button--google:hover {\n  background-color: #c23321\n}\n\n.resp-sharing-button--linkedin {\n  background-color: #0077b5\n}\n\n.resp-sharing-button--linkedin:hover {\n  background-color: #046293\n}\n\n.resp-sharing-button--email {\n  background-color: #777\n}\n\n.resp-sharing-button--email:hover {\n  background-color: #5e5e5e\n}\n\n.resp-sharing-button--xing {\n  background-color: #1a7576\n}\n\n.resp-sharing-button--xing:hover {\n  background-color: #114c4c\n}\n\n.resp-sharing-button--whatsapp {\n  background-color: #25D366\n}\n\n.resp-sharing-button--whatsapp:hover {\n  background-color: #1da851\n}",
	"sizes": {
		"small": false,
		"medium": false,
		"large": true
	},
	"networks": {
		'facebook': {
			'visible': true,
			'name': 'Facebook',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.5H14.5V5.6c0-.9.6-1.1 1-1.1h3V.54L14.17.53C10.24.54 9.5 3.48 9.5 5.37V7.5h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M15.595,11.5H13.5c0,3.013,0,7,0,7h-3 c0,0,0-3.951,0-7h-2v-2h2V8.336c0-1.1,0.352-2.819,2.649-2.819L15.5,5.524V7.83c0,0-1.163,0-1.408,0 c-0.244,0-0.592,0.124-0.592,0.647V9.5h2.339L15.595,11.5z"/>\n    </svg>'
			},
			'style': '.resp-sharing-button--facebook {\n  background-color: #3b5998;\n  border-color: #3b5998;\n}\n\n.resp-sharing-button--facebook:hover,\n.resp-sharing-button--facebook:active {\n  background-color: #2d4373;\n  border-color: #2d4373;\n}',
			'scriptSize': 73.3,
			'requests': 3
		},
		'twitter': {
			'visible': true,
			'name': 'Twitter',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.4 4.83c-.8.37-1.5.38-2.22.02.94-.56.98-.96 1.32-2.02-.88.52-1.85.9-2.9 1.1-.8-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.12 1.04-3.78-.2-7.12-2-9.37-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.73-.03-1.43-.23-2.05-.57v.06c0 2.2 1.57 4.03 3.65 4.44-.67.18-1.37.2-2.05.08.57 1.8 2.25 3.12 4.24 3.16-1.95 1.52-4.36 2.16-6.74 1.88 2 1.3 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93l-.02-.6c.9-.63 1.96-1.22 2.57-2.14z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z"/><circle cx="12" cy="12" r="11.5"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M17.262,9.385 c0.006,0.113,0.008,0.226,0.008,0.34c0,3.478-2.647,7.489-7.488,7.489c-1.486,0-2.87-0.437-4.035-1.184 c1.374,0.161,2.771-0.207,3.896-1.089c-1.151-0.022-2.123-0.783-2.458-1.829c0.396,0.075,0.803,0.061,1.188-0.046 c-1.204-0.24-2.111-1.305-2.111-2.579c0-0.011,0-0.023,0-0.035c0.355,0.197,0.762,0.315,1.192,0.33 c-0.706-0.473-1.171-1.277-1.171-2.19c0-0.482,0.13-0.934,0.356-1.324c1.298,1.593,3.237,2.642,5.425,2.75 c-0.045-0.191-0.068-0.394-0.068-0.599c0-1.454,1.179-2.632,2.633-2.632c0.757,0,1.44,0.319,1.921,0.832 c0.6-0.119,1.95-0.266,1.95-0.266C18.147,7.882,17.776,9.013,17.262,9.385z"/>\n    </svg>'
			},
			'style': '.resp-sharing-button--twitter {\n  background-color: #55acee;\n  border-color: #55acee;\n}\n\n.resp-sharing-button--twitter:hover,\n.resp-sharing-button--twitter:active {\n  background-color: #2795e9;\n  border-color: #2795e9;\n}',
			'scriptSize': 52.7,
			'requests': 4
		},
		'google': {
			'visible': true,
			'name': 'Google+',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.85 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.32-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.84 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.33-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><ellipse cx="10.24" cy="8.5" transform="rotate(-45 10.234 8.5)" rx="2.89" ry="3.08"/><path d="M9.85 5.5h4.2"/><ellipse cx="10.24" cy="16.32" rx="4.48" ry="2.59"/><path d="M11.85 11.1c-.93 2.35 2.86 1.64 2.86 5.22M17.5 7v5M20 9.5h-5"/></svg>',
				'solidcircle': '\n    <svg version="1.1"x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <g>\n            <path d="M12.646,8.608C12.626,7.938,12.344,7.3,11.854,6.81c-0.513-0.513-1.18-0.795-1.878-0.795c-0.627,0-1.207,0.235-1.634,0.662 C7.895,7.124,7.66,7.732,7.681,8.389c0.021,0.669,0.303,1.308,0.794,1.797c0.966,0.968,2.616,1.031,3.511,0.134 C12.433,9.873,12.667,9.265,12.646,8.608z"/>\n            <path d="M10.164,14.226c-2.155,0-3.977,0.958-3.977,2.093c0,1.135,1.821,2.092,3.977,2.092s3.976-0.958,3.976-2.092 C14.14,15.184,12.319,14.226,10.164,14.226z"/>\n            <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M10.164,19.411 c-2.791,0-4.977-1.358-4.977-3.092c0-1.734,2.186-3.093,4.977-3.093c0.832,0,1.599,0.133,2.281,0.349 c-0.58-0.392-1.257-0.858-1.311-1.692c-0.254,0.06-0.514,0.101-0.783,0.101c-0.965,0-1.883-0.387-2.584-1.089 C7.096,10.224,6.71,9.345,6.682,8.42C6.651,7.484,6.99,6.614,7.635,5.969c0.631-0.631,1.509-0.932,2.397-0.918V5h3.937v1h-1.533 c0.04,0.037,0.086,0.064,0.125,0.102c0.671,0.672,1.057,1.55,1.086,2.475c0.029,0.936-0.31,1.806-0.954,2.45 c-0.153,0.154-0.321,0.292-0.499,0.41c-0.189,0.592,0.059,0.802,0.832,1.322c0.892,0.601,2.114,1.423,2.114,3.56 C15.14,18.052,12.954,19.411,10.164,19.411z M20,10h-2v2h-1v-2h-2V9h2V7h1v2h2V10z"/>\n        </g>\n    </svg>'
			},
			'style': '.resp-sharing-button--google {\n  background-color: #dd4b39;\n  border-color: #dd4b39;\n}\n\n.resp-sharing-button--google:hover,\n.resp-sharing-button--google:active {\n  background-color: #c23321;\n  border-color: #c23321;\n}',
			'scriptSize': 15.1,
			'requests': 1
		},
		'tumblr': {
			'visible': true,
			'name': 'Tumblr',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M12.5 4.5v3h2v2h-2v3.72c0 2.47 1.48 2.7 3 1.7v2.7c-4.1 1.92-6-.62-6-3.6V9.5h-2V8.14c.55-.18 1.24-.43 1.63-.77.4-.33.7-.73.94-1.2.24-.46.4-.95.5-1.67h1.93z"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M15.492,17.616C11.401,19.544,9.5,17,9.5,14.031 V9.5h-2V8.142c0.549-0.178,1.236-0.435,1.627-0.768c0.393-0.334,0.707-0.733,0.943-1.2c0.238-0.467,0.401-0.954,0.49-1.675H12.5v3h2 v2h-2v3.719c0,2.468,1.484,2.692,2.992,1.701V17.616z"/>\n     </svg>'
			},
			'style': '.resp-sharing-button--tumblr {\n  background-color: #35465C;\n  border-color: #35465C;\n}\n\n.resp-sharing-button--tumblr:hover,\n.resp-sharing-button--tumblr:active {\n  background-color: #222d3c;\n  border-color: #222d3c;\n}',
			'scriptSize': 11.6,
			'requests': 1
		},
		'email': {
			'visible': true,
			'name': 'E-Mail',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-3-9.5L12 14 3.5 8.5m0 7.5L7 14m13.5 2L17 14"/></svg>',
				'solid' : '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.5 16c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5v8zm-2-7.5L12 13 6.5 8.5m11 6l-4-2.5m-7 2.5l4-2.5"/><circle cx="12" cy="12" r="11.5"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <g>\n            <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M20,16c0,1.103-0.897,2-2,2H6 c-1.103,0-2-0.897-2-2V8c0-1.103,0.897-2,2-2h12c1.103,0,2,0.897,2,2V16z"/>\n            <path d="M17.887,8.184c-0.175-0.214-0.49-0.245-0.704-0.07L12,12.354L6.817,8.113C6.603,7.938,6.288,7.97,6.113,8.184 S5.97,8.712,6.183,8.887l3.618,2.96l-3.566,2.229c-0.234,0.147-0.306,0.455-0.159,0.689C6.171,14.917,6.334,15,6.5,15 c0.091,0,0.182-0.024,0.265-0.076l3.854-2.409l1.064,0.872C11.775,13.462,11.888,13.5,12,13.5s0.225-0.038,0.317-0.113l1.065-0.872 l3.854,2.409C17.317,14.976,17.409,15,17.5,15c0.167,0,0.33-0.083,0.425-0.235c0.146-0.234,0.075-0.542-0.159-0.689l-3.566-2.229 l3.618-2.96C18.03,8.712,18.062,8.397,17.887,8.184z"/>\n        </g>\n    </svg>'
			},
			'style': '.resp-sharing-button--email {\n  background-color: #777777;\n  border-color: #777777;\n}\n\n.resp-sharing-button--email:hover,\n.resp-sharing-button--email:active {\n  background-color: #5e5e5e;\n  border-color: #5e5e5e;\n}',
			'scriptSize': 0,
			'requests': 0,
			'openInThisWindow': true
		},
		'pinterest': {
			'visible': true,
			'name': 'Pinterest',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z"/></svg>',
				'circle': '\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M8 11.2c-.15-.32-.25-.72-.25-1.22 0-2.32 1.74-4.4 4.53-4.4 2.47 0 3.82 1.5 3.82 3.52 0 2.64-1.17 4.88-2.9 4.88-.97 0-1.7-.8-1.46-1.77.28-1.14.8-2.4.8-3.23 0-.76-.4-1.38-1.23-1.38-.95 0-1.74 1-1.74 2.37 0 .86.3 1.45.3 1.45l-1.2 5c-.34 1.5-.04 3.33-.02 3.5.02.1.16.15.22.06.1-.12 1.26-1.56 1.66-3l.66-2.53c.32.6 1.25 1.14 2.24 1.14 2.95 0 4.95-2.7 4.95-6.3 0-2.73-2.3-5.27-5.82-5.27-4.36 0-6.57 3.14-6.57 5.75 0 .85.18 1.64.53 2.28l1.5-.8z"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M13.391,15.563c-0.992,0-1.926-0.535-2.244-1.145c0,0-0.535,2.117-0.646,2.526c-0.398,1.443-1.569,2.889-1.66,3.007c-0.063,0.084-0.203,0.058-0.218-0.053 c-0.025-0.184-0.323-2.005,0.027-3.492c0.176-0.746,1.183-5.008,1.183-5.008s-0.294-0.588-0.294-1.454 c0-1.362,0.79-2.378,1.772-2.378c0.836,0,1.24,0.626,1.24,1.378c0,0.841-0.535,2.098-0.813,3.261 c-0.23,0.977,0.49,1.772,1.451,1.772c1.741,0,2.914-2.238,2.914-4.888c0-2.013-1.356-3.521-3.824-3.521 c-2.787,0-4.525,2.08-4.525,4.4c0,0.498,0.092,0.904,0.249,1.246L6.49,12.02c-0.355-0.637-0.527-1.434-0.527-2.279 C5.963,7.13,8.165,4,12.531,4c3.51,0,5.818,2.539,5.818,5.266C18.35,12.869,16.346,15.563,13.391,15.563z"/>\n    </svg>'
			},
			'style': '.resp-sharing-button--pinterest {\n  background-color: #bd081c;\n  border-color: #bd081c;\n}\n\n.resp-sharing-button--pinterest:hover,\n.resp-sharing-button--pinterest:active {\n  background-color: #8c0615;\n  border-color: #8c0615;\n}',
			'scriptSize': 12.9,
			'requests': 3
		},
		'linkedin': {
			'visible': false,
			'name': 'LinkedIn',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5h-.04c-1.5 0-2.5-1.18-2.5-2.48 0-1.33 1.02-2.4 2.56-2.4s2.5 1.1 2.52 2.43c0 1.3-.98 2.45-2.55 2.45zm11.5 6c-1.1 0-2 .9-2 2v7h-5s.06-12 0-13h5V10s1.55-1.46 3.94-1.46c2.96 0 5.06 2.15 5.06 6.3v6.66h-5v-7c0-1.1-.9-2-2-2z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15 12.5c-.28 0-.5.22-.5.5v3.5h-3s.03-6.48 0-7h3v.83s.46-.75 1.7-.75c1.56 0 2.3 1.12 2.3 3.3v3.62h-3V13c0-.28-.23-.5-.5-.5zm-7.5-3h2v7h-2z"/><circle cx="8.5" cy="6.5" r="1"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M9.5,16.5h-2v-7h2V16.5z M8.5,7.5 c-0.553,0-1-0.448-1-1c0-0.552,0.447-1,1-1s1,0.448,1,1C9.5,7.052,9.053,7.5,8.5,7.5z M18.5,16.5h-3V13c0-0.277-0.225-0.5-0.5-0.5 c-0.276,0-0.5,0.223-0.5,0.5v3.5h-3c0,0,0.031-6.478,0-7h3v0.835c0,0,0.457-0.753,1.707-0.753c1.55,0,2.293,1.12,2.293,3.296V16.5z" />\n    </svg>'
			},
			'style': '.resp-sharing-button--linkedin {\n  background-color: #0077b5;\n  border-color: #0077b5;\n}\n\n.resp-sharing-button--linkedin:hover,\n.resp-sharing-button--linkedin:active {\n  background-color: #046293;\n  border-color: #046293;\n}',
			'scriptSize': 47.7,
			'requests': 2
		},
		'reddit': {
			'visible': false,
			'name': 'Reddit',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><ellipse cx="12" cy="15" rx="9.5" ry="6.5"/><path d="M15.54 17.88c-.96.55-2.2.88-3.54.88-1.35 0-2.6-.33-3.55-.9"/><circle cx="16" cy="13.5" r="1.5"/><circle cx="8" cy="13.5" r="1.5"/><path d="M18.74 10.42C19.14 9.58 20 9 21 9c1.38 0 2.5 1.12 2.5 2.5 0 1.25-.92 2.3-2.12 2.47"/><circle cx="20" cy="4.5" r="2.5"/><path d="M5.26 10.42C4.86 9.58 4 9 3 9 1.62 9 .5 10.12.5 11.5c0 1.25.92 2.3 2.12 2.47M12 8.5s-.13-7.4 5.5-4"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 13.37C1.5 13.07 1 12.35 1 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.05zm3.7.13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.8 4.8c-1.08.63-2.42.96-3.8.96-1.4 0-2.74-.34-3.8-.95-.24-.13-.32-.44-.2-.68.15-.24.46-.32.7-.18 1.83 1.06 4.76 1.06 6.6 0 .23-.13.53-.05.67.2.14.23.06.54-.18.67zm.2-2.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.7-2.13c-.38-1.16-1.2-2.2-2.3-3.05.38-.5.97-.82 1.6-.82 1.1 0 2 .9 2 2 0 .84-.53 1.57-1.3 1.87z"/></svg>',
				'circle': '\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><ellipse cx="12" cy="14.37" rx="6.2" ry="4.24"/><path d="M14.3 16.25c-.62.36-1.42.57-2.3.57-.88 0-1.7-.2-2.32-.58"/><circle cx="14.61" cy="13.39" r=".98"/><circle cx="9.39" cy="13.39" r=".98"/><path d="M16.4 11.38c.26-.55.82-.92 1.47-.92.9 0 1.63.73 1.63 1.63 0 .8-.6 1.47-1.38 1.6"/><circle cx="17.22" cy="7.52" r="1.63"/><path d="M7.6 11.38c-.26-.54-.82-.92-1.47-.92-.9 0-1.63.73-1.63 1.63 0 .8.6 1.47 1.38 1.6M12 10.12s-.08-4.82 3.6-2.6"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <g>\n            <circle cx="9.391" cy="13.392" r="0.978"/> \n            <path d="M14.057,15.814c-1.141,0.659-2.987,0.655-4.122-0.004c-0.238-0.138-0.545-0.058-0.684,0.182 c-0.139,0.239-0.058,0.545,0.182,0.685c0.72,0.417,1.631,0.646,2.567,0.646c0.931,0,1.838-0.228,2.557-0.642 c0.239-0.139,0.321-0.444,0.184-0.684C14.602,15.758,14.295,15.677,14.057,15.814z"/>\n            <path d="M5,12.086c0,0.411,0.229,0.78,0.568,0.978c0.27-0.662,0.735-1.264,1.353-1.774c-0.209-0.207-0.489-0.334-0.79-0.334 C5.507,10.956,5,11.463,5,12.086z"/>\n            <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M18.673,14.055 c0.01,0.104,0.022,0.208,0.022,0.314c0,2.613-3.004,4.739-6.695,4.739s-6.695-2.126-6.695-4.739c0-0.106,0.013-0.21,0.022-0.314 C4.538,13.735,4,12.975,4,12.086c0-1.175,0.956-2.131,2.131-2.131c0.629,0,1.217,0.288,1.617,0.756 c1.04-0.607,2.345-0.991,3.769-1.063c0.058-0.803,0.309-2.33,1.389-2.951c0.633-0.365,1.417-0.322,2.322,0.086 c0.302-0.811,1.076-1.392,1.989-1.392c1.175,0,2.131,0.957,2.131,2.13c0,1.175-0.956,2.131-2.131,2.131 c-1.064,0-1.941-0.789-2.097-1.812c-0.734-0.402-1.315-0.506-1.716-0.276c-0.601,0.345-0.818,1.394-0.881,2.086 c1.408,0.078,2.698,0.46,3.729,1.062c0.399-0.468,0.987-0.756,1.617-0.756c1.175,0,2.131,0.956,2.131,2.131 C20,12.975,19.462,13.735,18.673,14.055z"/>\n            <circle cx="14.609" cy="13.391" r="0.978"/>\n            <path d="M17.869,10.956c-0.301,0-0.582,0.128-0.79,0.334c0.617,0.51,1.083,1.112,1.353,1.774C18.771,12.867,19,12.498,19,12.086 C19,11.463,18.493,10.956,17.869,10.956z"/>\n        </g>\n    </svg>'
			},
			'style': '.resp-sharing-button--reddit {\n  background-color: #5f99cf;\n  border-color: #5f99cf;\n}\n\n.resp-sharing-button--reddit:hover,\n.resp-sharing-button--reddit:active {\n  background-color: #3a80c1;\n  border-color: #3a80c1;\n}',
			'scriptSize': 0.2,
			'requests': 0
		},
		'xing': {
			'visible': false,
			'name': 'XING',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.8 4.5h-5l3 5.5-4 6.5h5l4-6.5zm16.7-4H18l-8 14 5.3 9h5.4l-5.2-9z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.2 9.7l-3-5.4C7.2 4 7 4 6.8 4h-5c-.3 0-.4 0-.5.2v.5L4 10 .4 16v.5c0 .2.2.3.4.3h5c.3 0 .4 0 .5-.2l4-6.6v-.5zM24 .2l-.5-.2H18s-.2 0-.3.3l-8 14v.4l5.2 9c0 .2 0 .3.3.3h5.4s.3 0 .4-.2c.2-.2.2-.4 0-.5l-5-8.8L24 .7V.2z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M8.4 8.5h-3L7 11.3l-2.2 3.2h3l2.3-3.2zm10-3h-3.2l-5 8.5 3.2 5.5h3.3l-3-5.5z"/></svg>',
				'solidcircle': '\n    <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">\n        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M7.844,14.531H4.76l2.238-3.276L5.322,8.5h3.084 l1.676,2.754L7.844,14.531z M16.703,19.5h-3.271l-3.131-5.489L15.16,5.5h3.271l-4.859,8.511L16.703,19.5z"/>\n    </svg>'
			},
			'style': '.resp-sharing-button--xing {\n  background-color: #1a7576;\n  border-color: #1a7576;\n}\n\n.resp-sharing-button--xing:hover\n.resp-sharing-button--xing:active {\n  background-color: #114C4C;\n  border-color: #114C4C;\n}',
			'scriptSize': 4.6,
			'requests': 3
		},
		'whatsapp': {
			'visible': false,
			'name': 'WhatsApp',
			'icons': {
				'normal': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-width="1px" d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg>',
				'solid': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg>',
				'circle': '\n    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="12" r="11.5"/><path stroke-width="1px" d="M17.6 6.2c-1.5-1.5-3.4-2.3-5.5-2.3-4.3 0-7.8 3.5-7.8 7.8 0 1.4.4 2.7 1 3.9l-1.1 4 4.1-1.1c1.1.6 2.4.9 3.7.9 4.3 0 7.8-3.5 7.8-7.8.1-2-.7-3.9-2.2-5.4zm-5.5 11.9c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2.4.6.7-2.4-.2-.2c-.6-1-1-2.2-1-3.4 0-3.6 2.9-6.5 6.5-6.5 1.7 0 3.3.7 4.6 1.9 1.2 1.2 1.9 2.8 1.9 4.6-.1 3.5-3 6.4-6.6 6.4zm3.5-4.8c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.4.1-.1.2-.5.6-.6.8-.1.1-.2.1-.4 0s-.8-.3-1.6-1c-.6-.5-1-1.2-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3s.1-.2.2-.3c.1-.1 0-.2 0-.3s-.4-1.1-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4s-.3 0-.5.2-.7.7-.7 1.6c0 1 .7 1.9.8 2s1.4 2.1 3.3 2.9c.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1 1.1-.5 1.3-.9.2-.5.2-.8.1-.9 0-.2-.2-.3-.4-.4z"/></svg>',
				'solidcircle': '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path d="m12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 3.8c2.2 0 4.2 0.9 5.7 2.4 1.6 1.5 2.4 3.6 2.5 5.7 0 4.5-3.6 8.1-8.1 8.1-1.4 0-2.7-0.4-3.9-1l-4.4 1.1 1.2-4.2c-0.8-1.2-1.1-2.6-1.1-4 0-4.5 3.6-8.1 8.1-8.1zm0.1 1.5c-3.7 0-6.7 3-6.7 6.7 0 1.3 0.3 2.5 1 3.6l0.1 0.3-0.7 2.4 2.5-0.7 0.3 0.099c1 0.7 2.2 1 3.4 1 3.7 0 6.8-3 6.9-6.6 0-1.8-0.7-3.5-2-4.8s-3-2-4.8-2zm-3 2.9h0.4c0.2 0 0.4-0.099 0.5 0.3s0.5 1.5 0.6 1.7 0.1 0.2 0 0.3-0.1 0.2-0.2 0.3l-0.3 0.3c-0.1 0.1-0.2 0.2-0.1 0.4 0.2 0.2 0.6 0.9 1.2 1.4 0.7 0.7 1.4 0.9 1.6 1 0.2 0 0.3 0.001 0.4-0.099s0.5-0.6 0.6-0.8c0.2-0.2 0.3-0.2 0.5-0.1l1.4 0.7c0.2 0.1 0.3 0.2 0.5 0.3 0 0.1 0.1 0.5-0.099 1s-1 0.9-1.4 1c-0.3 0-0.8 0.001-1.3-0.099-0.3-0.1-0.7-0.2-1.2-0.4-2.1-0.9-3.4-3-3.5-3.1s-0.8-1.1-0.8-2.1c0-1 0.5-1.5 0.7-1.7s0.4-0.3 0.5-0.3z"/></svg>'
			},
			'style':'.resp-sharing-button--whatsapp {\n  background-color: #25D366;\n  border-color: #25D366;\n}\n\n.resp-sharing-button--whatsapp:hover,\n.resp-sharing-button--google:active {\n  background-color: #1DA851;\n  border-color: #1DA851;\n}',
			'scriptSize': 15.1,
			'requests': 1
		},
	}
}

var AppStore = assign({}, EventEmitter.prototype, {
	// Returns the current data
	getData: function() {
		this._updateLinks();
		return _data;
	},
	/**
	 * Toggles a social network
	 * @param  {string} name - The name of the network to be toggled
	 */
	_toggleNetwork: function(name) {
		_data.networks[name].visible = !_data.networks[name].visible;
	},
	/**
	 * Changes the URL that is shared on click
	 * @param {string} url - The url to be shared
	 */
	_setURL: function(url) {
		_data.url = url;
		this._updateLinks();
	},
	/**
	 * Changes the text that is shared on click
	 * @param {string} text - The text to be shared
	 */
	_setText: function(text) {
		_data.text = text;
		this._updateLinks();
	},
	/**
	 * @param  {string} size - The size of the buttons. Has to be "small", "medium" or "large"
	 */
	_changeSize: function(size) {
		var sizes = _data.sizes;

		for (var option in sizes) {
			if (sizes[option] === true) {
				sizes[option] = false;
			}
		}
		sizes[size] = true;
	},
	/**
	 * Toggles the type of icon used. Has to be "circle" or "solid"
	 * @param  {string} icon - The icon type
	 */
	_toggleIcon: function(type) {
		var icons = _data.icons;
		icons[type] = !icons[type];
	},
	/**
	 * Changes the sharing URLs
	 * @return {bool}
	 */
	_updateLinks: function() {
		var text = encodeURIComponent(_data.text);
		var url = encodeURIComponent(_data.url);

		var links = {
			'facebook': 'https://facebook.com/sharer/sharer.php?u=' + url,
			'twitter': 'https://twitter.com/intent/tweet/?text=' + text + '&url=' + url,
			'google': 'https://plus.google.com/share?url=' + url,
			'tumblr': "https://www.tumblr.com/widgets/share/tool?posttype=link&title=" + text + "&caption=" + text + "&content=" + url + "&canonicalUrl=" + url + "&shareSource=tumblr_share_button",
			'pinterest': 'https://pinterest.com/pin/create/button/?url=' + url + '&media=' + url + '&description=' + text,
			'linkedin': 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + text + '&summary=' + text + '&source=' + url,
			'reddit': 'https://reddit.com/submit/?url=' + url,
			'email': 'mailto:?subject=' + text + '&body=' + url,
			'xing': 'https://www.xing.com/app/user?op=share;url=' + url + ';title=' + text,
			'whatsapp': 'whatsapp://send?text=' + text + '%20' + url
		}

		for (var network in _data.networks) {
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

// Catch the events dispatched by the AppDispatcher
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
		case AppConstants.TOGGLE_ICON:
			AppStore._toggleIcon(action.type);
			break;
		default:
			return false;
	}
	AppStore.emitChange();
	return true;
});

module.exports = AppStore;
